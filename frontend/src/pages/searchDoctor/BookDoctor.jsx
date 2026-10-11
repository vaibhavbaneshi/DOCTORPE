import { useEffect, useState } from "react";
import { Calendar } from "../../components/Calender/Calender.jsx";
import { SuccessMessage } from "../../components/Alert/SuccessMessage.jsx";
import { ErrorMessage } from "../../components/Alert/ErrorMessage.jsx";
import { useSelector } from "react-redux";
import ChatBotButton from "../../components/ChatBot/ChatBotButton.jsx";
import { api } from "../../lib/api.js";
import { SpecialtyFilter } from "../../components/Doctors/SpecialtyFilter.jsx";
import { DoctorGrid } from "../../components/Doctors/DoctorGrid.jsx";

export const BookDoctor = () => {
    const [users, setUsers] = useState([]);
    const [selectedSpecialty, setSelectedSpecialty] = useState("ALL");
    const [selectedDateTime, setSelectedDateTime] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [showError, setShowError] = useState(false);
    const { currentUser } = useSelector((state) => state.user);
    const [isLoading, setIsLoading] = useState(true);
    const [fetchError, setFetchError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        const load = async () => {
            try {
                const [doctorsRes, appointmentsRes] = await Promise.all([
                    api.get("/user/searchDoctor"),
                    api.get("/user/fetchAppointment"),
                ]);
                setUsers(doctorsRes.data);
                setAppointments(appointmentsRes.data);
            } catch (err) {
                const message = err.response?.data?.message;
                if (err.response?.status === 401) {
                    setFetchError("Session expired. Please sign in again.");
                } else {
                    setFetchError(message || "Could not load doctors. Please try again.");
                }
            } finally {
                setIsLoading(false);
            }
        };
        load();
    }, []);

    useEffect(() => {
        if (!showAlert && !showError) return undefined;
        const timer = setTimeout(() => {
            setShowAlert(false);
            setShowError(false);
        }, 5000);
        return () => clearTimeout(timer);
    }, [showAlert, showError]);

    const filteredUsers =
        selectedSpecialty === "ALL"
            ? users
            : users.filter((user) => user.speciality === selectedSpecialty);

    const availableUsers = filteredUsers.filter((user) => {
        if (!selectedDateTime) return true;
        return !appointments.some(
            (appointment) =>
                appointment.doctorId === user._id &&
                appointment.date === selectedDateTime.date &&
                appointment.time === selectedDateTime.time
        );
    });

    const handleOnClick = async (user) => {
        if (!selectedDateTime) {
            setShowError(true);
            return;
        }
        try {
            const response = await api.post("/user/bookAppointment", {
                doctorId: user._id,
                date: selectedDateTime.date,
                time: selectedDateTime.time,
            });

            if (!response.data.status) {
                setShowError(true);
                return;
            }

            const loggedInPatientEmail = currentUser.data.email;
            const loggedInPatientfullname =
                currentUser.data.firstName + " " + currentUser.data.lastName;

            const appointmentsRes = await api.get("/user/fetchAppointment");
            setAppointments(appointmentsRes.data);

            const emailNote = response.data.emailSent
                ? `Confirmation emails were sent to ${loggedInPatientEmail} and the doctor.`
                : "Appointment saved. Configure SMTP_USER and SMTP_PASS in backend/.env to enable email confirmations.";
            setSuccessMessage(
                `Your appointment with Dr. ${user.fullname} is scheduled for ${selectedDateTime.date} at ${selectedDateTime.time}. ${emailNote}`
            );
            setShowAlert(true);
        } catch (error) {
            if (error.response?.status === 401) {
                setFetchError("Session expired. Please sign in again.");
            } else if (error.response?.data?.message) {
                setFetchError(error.response.data.message);
            }
            setShowError(true);
        }
    };

    return (
        <div className="min-h-[100dvh] w-full px-4 py-12 sm:px-6">
            {showError && (
                <ErrorMessage message="Please select an available date and time" />
            )}
            {showAlert && successMessage && (
                <SuccessMessage message={successMessage} />
            )}

            <div className="mx-auto max-w-6xl">
                <header className="pb-10">
                    <h1 className="text-balance text-4xl font-semibold tracking-tight text-ink md:text-6xl">
                        Find the right doctor
                    </h1>
                    <p className="mt-4 max-w-[65ch] text-lg leading-relaxed text-mute">
                        Choose a specialty and visit time, then book with a verified clinician.
                    </p>
                </header>
                <SpecialtyFilter
                    selected={selectedSpecialty}
                    onChange={setSelectedSpecialty}
                    specialties={[
                        "ALL",
                        "CARDIOLOGY",
                        "ORTHOPEDICS",
                        "CONCOLOGY",
                        "DERMATOLOGY",
                        "SURGERY",
                        "LAB ASSISTANT",
                    ]}
                />
                <div className="flex justify-center py-10">
                    <Calendar
                        onDateTimeSelect={(date, time) => setSelectedDateTime({ date, time })}
                    />
                </div>
                {fetchError && <p className="mb-6 text-center text-red-700" aria-live="polite">{fetchError}</p>}
                <DoctorGrid
                    doctors={availableUsers}
                    loading={isLoading}
                    onSelect={handleOnClick}
                    label="Schedule Appointment"
                />
            </div>
            <ChatBotButton />
        </div>
    );
};
