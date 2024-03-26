import { useEffect, useState } from "react";
import {DoctorCard} from "../../components/Card/DoctorCard";
import axios from "axios";
import Heading from '../../components/products/Heading.jsx';
import { sendDoctor, sendPatient } from "../../components/Email/EmailSend.js";
import { useSelector } from "react-redux";
import randomString from "crypto-random-string";

export const SearchDoctor = () => {
    const [users, setUsers] = useState([]);
    const [selectedSpecialty, setSelectedSpecialty] = useState("ALL");
    const { currentUser } = useSelector(state => state.user) 

    const getRandomCode = () => {
        const threeLengthCode = () => randomString({ length: 3, type: "distinguishable" });
    return `${threeLengthCode()}-${threeLengthCode()}-${threeLengthCode()}`;
    };

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/searchDoctor")
            .then(response => {
                setUsers(response.data); 
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);

    const handleOnClick = async (email, fullname) => {

        const callId = getRandomCode()
        const callIdString = callId.toString();

        sendDoctor(email, fullname, callIdString)
        sendPatient(currentUser.data.email, fullname, callIdString)

        window.location.href = "https://online-meet-rosy.vercel.app/"
        console.log(callId);
    };

    const handleSpecialtyChange = (specialty) => {
        setSelectedSpecialty(specialty);
    };

    const filteredUsers = selectedSpecialty === "ALL" ? users : users.filter(user => user.speciality === selectedSpecialty);

    return (
        <div className="bg-gray-100 h-full w-full py-2 mx-auto px-6">
            <div className="">
                <div className="text-2xl font-medium font-serif p-10 pl-20">
                    <Heading title="Doctors"/>
                </div>
                <div className="flex justify-around w-100  transition duration-200 ease-in hover:scale-105 item-center">
                    <div className="bg-white rounded-2xl border  hover:shadow-lg">
                        {["ALL", "CARDIOLOGY", "ORTHOPEDICS", "CONCOLOGY", "DERMETOLOGY", "SURGERY", "GYNOCOLOGY"].map(specialty => (
                            <button key={specialty} 
                                    className={` py-4 px-8 text-xs hover:underline hover:bg-gradient-to-r from-cyan-500 to-blue-500 hover:text-white hover:rounded-2xl hover:mx-1 ${selectedSpecialty === specialty ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-2xl' : ''}`} 
                                    onClick={() => handleSpecialtyChange(specialty)}>
                                {specialty}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-5">
                {filteredUsers.map(user => (
                    user.isAvailable ? <DoctorCard key={user._id} onClick={() => handleOnClick(user.email, user.fullname)} name={user.fullname} email={user.email} description={"Sample Description"} speciality={user.speciality} label={"Book an Appointment"}/> : <></>
                ))}
            </div>
        </div>
    );
};
