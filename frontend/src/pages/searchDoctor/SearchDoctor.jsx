import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import randomString from "crypto-random-string";
import { sendDoctorConsult, sendPatientConsult } from "../../components/Email/EmailSend.js";
import ChatBotButton from "../../components/ChatBot/ChatBotButton.jsx";
import { api } from "../../lib/api.js";
import { SpecialtyFilter } from "../../components/Doctors/SpecialtyFilter.jsx";
import { DoctorGrid } from "../../components/Doctors/DoctorGrid.jsx";

export const SearchDoctor = () => {
    const [users, setUsers] = useState([]);
    const [selectedSpecialty, setSelectedSpecialty] = useState("ALL");
    const { currentUser } = useSelector((state) => state.user);
    const [showAlert, setShowAlert] = useState(false);
    const [count, setCount] = useState(5);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/user/searchDoctor");
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (!showAlert) return undefined;
        const timeoutId = setInterval(() => {
            setCount((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(timeoutId);
    }, [showAlert]);

    useEffect(() => {
        if (showAlert && count <= 0) {
            window.location.href = "https://online-meet-rosy.vercel.app/";
        }
    }, [showAlert, count]);

    const handleOnClick = async (user) => {
        const threeLengthCode = () => randomString({ length: 3, type: "distinguishable" });
        const callIdString = `${threeLengthCode()}-${threeLengthCode()}-${threeLengthCode()}`;
        const loggedInPatientEmail = currentUser.data.email;
        const loggedInPatientfullname =
            currentUser.data.firstName + " " + currentUser.data.lastName;

        setShowAlert(true);
        setCount(5);
        sendDoctorConsult(user.email, user.fullname, callIdString);
        sendPatientConsult(loggedInPatientEmail, loggedInPatientfullname, callIdString);
    };

    const filteredUsers =
        selectedSpecialty === "ALL"
            ? users
            : users.filter((user) => user.speciality === selectedSpecialty);

    return (
        <div className="relative min-h-[100dvh] w-full px-4 py-12 sm:px-6">
            {showAlert && (
                <div className="mx-auto mb-8 max-w-xl rounded-[1.25rem] bg-canopy/10 px-5 py-4 text-canopy" aria-live="polite">
                    <p className="font-semibold">Call ID sent to {currentUser.data.email}</p>
                    <p className="mt-1 text-sm tabular-nums">Opening the consultation room in {count} seconds.</p>
                </div>
            )}

            <div className="mx-auto max-w-6xl">
                <header className="pb-10">
                    <h1 className="text-balance text-4xl font-semibold tracking-tight text-ink md:text-6xl">
                        Consult from home
                    </h1>
                    <p className="mt-4 max-w-[65ch] text-lg leading-relaxed text-mute">
                        Choose a verified specialist and receive the private call details by email.
                    </p>
                </header>
                <SpecialtyFilter selected={selectedSpecialty} onChange={setSelectedSpecialty} />
                <div className="mt-10">
                    <DoctorGrid
                        doctors={filteredUsers}
                        loading={isLoading}
                        onSelect={handleOnClick}
                        label="Start Video Consult"
                    />
                </div>
            </div>
            <ChatBotButton />
        </div>
    );
};
