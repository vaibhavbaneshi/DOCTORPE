import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const Calendar = ({ onDateTimeSelect, onAppointments }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [label, setLabel] = useState(false); // Changed to false
  const [modalVisible, setModalVisible] = useState(false);
  const [timeError, setTimeError] = useState(null);
  const [dateError, setDateError] = useState(null);
  const [currentDateTime, setCurrentDateTime] = useState(new Date()); // Initialized with current date time

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setDateError(null); // Changed to null
  };

  const handleTimeChange = (time) => {
    setTimeError(null); // Changed to null
    setSelectedTime(time);
  };

  const handleSave = async () => {
    if (!selectedDate) {
      setDateError('Please select a date');
      return;
    }

    if (!selectedTime) {
      setTimeError('Please select a time');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3000/api/v1/user/fetchAppointment`);
      onDateTimeSelect(selectedDate, selectedTime);
      onAppointments(response.data);
      setLabel(true);
      setModalVisible(false);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleDiscard = () => {
    setLabel(false);
    setModalVisible(false);
  };

  const renderTimeOptions = () => {
    const times = [
      '09:30 AM', '10:00 AM', '10:30 AM',
      '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
      '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
      '03:00 PM', '03:30 PM', '04:00 PM', '4:30 PM',
    ];

    return times.map((time, index) => (
      <li key={index}>
        <input
          type="radio"
          id={`time-${index}`}
          className="hidden peer"
          name="timetable"
          onChange={() => handleTimeChange(time)}
          checked={selectedTime === time}
        />
        <label
          htmlFor={`time-${index}`}
          className="inline-flex items-center justify-center w-full px-4 py-1 text-sm font-medium text-center hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-800 border rounded-lg cursor-pointer text-gray-500 border-gray-200 dark:border-gray-700 dark:peer-checked:border-blue-500 peer-checked:border-blue-700 dark:hover:border-gray-600 dark:peer-checked:text-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-600 dark:peer-checked:bg-blue-900"
        >
          {time}
        </label>
      </li>
    ));
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => setModalVisible(true)} // Toggle modal visibility on button click
        className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:underline border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
      >
        <svg
          className="w-4 h-4 me-1"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
            clipRule="evenodd"
          />
        </svg>
        Select Date and Time
      </button>
      {label && selectedDate && <label className='ml-10 hover:underline hover:shadow-xl hover:shadow-sky-300 transition-shadow'>Selected Date is: {selectedDate}</label>}
      {label && selectedTime && <label className='ml-10 hover:underline hover:shadow-xl hover:shadow-sky-300 transition-shadow'>Selected Time is: {selectedTime}</label>}
      {/* Main modal */}
      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className='absolute inset-0 flex items-center justify-center'>

            <div className="absolute inset-0 bg-gray-800 bg-opacity-75"></div>
            <div className="relative bg-white rounded-lg shadow-md dark:bg-gray-800">
              <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Select Date and Time
                </h3>
                <button
                  type="button"
                  onClick={() => setModalVisible(false)} // Close modal on button click
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 pt-0">
                <label className="text-sm font-medium text-gray-900 dark:text-white mb-2 block pt-3">
                  Select a Date
                </label>
                <input
                  type="date"
                  onChange={(e) => handleDateChange(e.target.value)}
                  className="hover:cursor-pointer hover:bg-gray-200 w-full px-3 py-2 mb-3 border rounded-md text-gray-900 dark:text-white border-gray-300 dark:border-gray-700 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <label className="text-sm font-medium text-gray-900 dark:text-white mb-2 block">
                  Select a Time
                </label>
                <ul id="timetable" className="grid w-full grid-cols-3 gap-2 mb-5">
                  {renderTimeOptions()}
                </ul>
                {dateError && <div className="text-red-500 pb-4">{dateError}</div>}
                {timeError && <div className="text-red-500 pb-4">{timeError}</div>}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={handleSave}
                    className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:underline focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={handleDiscard} // Close modal on button click
                    className="hover:underline py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    Discard
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
