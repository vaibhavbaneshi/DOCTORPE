import { useMemo, useState } from "react";
import { Cross2Icon } from "@radix-ui/react-icons";

const times = [
  "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM",
  "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
];

const todayIso = () => new Date().toISOString().slice(0, 10);

const parseSlot = (dateStr, timeStr) => {
  const match = timeStr.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return null;
  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  const meridiem = match[3].toUpperCase();
  if (meridiem === "PM" && hours !== 12) hours += 12;
  if (meridiem === "AM" && hours === 12) hours = 0;
  const slot = new Date(`${dateStr}T00:00:00`);
  slot.setHours(hours, minutes, 0, 0);
  return slot;
};

const isPastSlot = (dateStr, timeStr) => {
  const slot = parseSlot(dateStr, timeStr);
  return !slot || slot <= new Date();
};

export const Calendar = ({ onDateTimeSelect }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState("");
  const minDate = todayIso();

  const formattedDate = selectedDate
    ? new Intl.DateTimeFormat("en-IN", { dateStyle: "medium" }).format(
        new Date(`${selectedDate}T00:00:00`)
      )
    : "";

  const summary = formattedDate && selectedTime
    ? `${formattedDate} at ${selectedTime}`
    : "Pick a date and time for your visit";

  const openModal = () => {
    setError("");
    setModalVisible(true);
  };

  const handleSave = () => {
    if (!selectedDate || !selectedTime) {
      setError("Choose both a date and a time.");
      return;
    }
    if (selectedDate < minDate) {
      setError("Past dates are not available.");
      return;
    }
    if (isPastSlot(selectedDate, selectedTime)) {
      setError("Choose a time in the future.");
      return;
    }

    onDateTimeSelect(selectedDate, selectedTime);
    setError("");
    setModalVisible(false);
  };

  const availableTimes = useMemo(
    () =>
      times.map((time) => ({
        time,
        disabled: selectedDate ? isPastSlot(selectedDate, time) : false,
      })),
    [selectedDate]
  );

  return (
    <div className="w-full max-w-lg">
      <button
        type="button"
        onClick={openModal}
        className="w-full rounded-[1.6rem] bg-surface p-6 text-left ring-1 ring-ink/5 transition-colors duration-200 ease-spring hover:bg-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-canopy"
      >
        <p className="text-sm font-medium text-canopy">Visit schedule</p>
        <p className="mt-2 text-lg font-semibold text-ink">{summary}</p>
        <p className="mt-3 text-sm text-mute">Tap anywhere here to choose date and time</p>
      </button>

      {modalVisible && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/45 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="schedule-title"
          onClick={() => setModalVisible(false)}
        >
          <div
            className="max-h-[90dvh] w-full max-w-xl overflow-y-auto overscroll-contain rounded-[1.6rem] bg-surface p-6 shadow-tint"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4">
              <h2 id="schedule-title" className="text-xl font-semibold text-ink">
                Schedule your visit
              </h2>
              <button
                type="button"
                onClick={() => setModalVisible(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-ink/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-canopy"
                aria-label="Close scheduling dialog"
              >
                <Cross2Icon aria-hidden="true" />
              </button>
            </div>

            <label htmlFor="appointment-date" className="mt-6 block text-sm font-medium text-ink">
              Date
            </label>
            <input
              id="appointment-date"
              name="appointment-date"
              type="date"
              min={minDate}
              value={selectedDate}
              onChange={(event) => {
                const nextDate = event.target.value;
                setSelectedDate(nextDate);
                if (selectedTime && isPastSlot(nextDate, selectedTime)) {
                  setSelectedTime("");
                }
                setError("");
              }}
              className="mt-2 h-11 w-full rounded-xl border border-ink/10 bg-canvas px-3 text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-canopy"
            />

            <fieldset className="mt-6">
              <legend className="text-sm font-medium text-ink">Time</legend>
              <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {availableTimes.map(({ time, disabled }) => (
                  <label
                    key={time}
                    className={disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer"}
                  >
                    <input
                      type="radio"
                      name="appointment-time"
                      value={time}
                      disabled={disabled}
                      checked={selectedTime === time}
                      onChange={() => {
                        setSelectedTime(time);
                        setError("");
                      }}
                      className="peer sr-only"
                    />
                    <span className="flex min-h-11 items-center justify-center rounded-xl border border-ink/10 px-3 text-sm tabular-nums text-mute hover:bg-ink/5 peer-checked:border-canopy peer-checked:bg-canopy peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-canopy peer-disabled:hover:bg-transparent">
                      {time}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            {error && (
              <p className="mt-4 text-sm text-red-700" aria-live="polite">
                {error}
              </p>
            )}

            <div className="mt-6 flex flex-wrap justify-end gap-3">
              <button
                type="button"
                onClick={() => setModalVisible(false)}
                className="min-h-11 rounded-full border border-ink/15 px-5 py-2 text-sm text-ink hover:bg-ink/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-canopy"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="min-h-11 rounded-full bg-canopy px-5 py-2 text-sm font-medium text-white hover:bg-canopy-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-canopy"
              >
                Save visit time
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
