import { useEffect, useState } from "react";
import DoctorCard from "../../components/Card/DoctorCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Heading from '../../components/products/Heading.jsx';
import { send } from "../../components/Email/EmailSend.js";

export const SearchDoctor = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [selectedSpecialty, setSelectedSpecialty] = useState("ALL");

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/searchDoctor")
            .then(response => {
                setUsers(response.data); 
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);

    const handleOnClick = async (email, username) => {

        send(email, username)

        window.location.href = "https://online-meet-rosy.vercel.app/"
    };

    const handleSpecialtyChange = (specialty) => {
        setSelectedSpecialty(specialty);
    };

    const filteredUsers = selectedSpecialty === "ALL" ? users : users.filter(user => user.speciality === selectedSpecialty);

    return (
        <div className="bg-gray-100 h-full w-full py-24 mx-auto px-6">
            <div className="">
                <div className="text-2xl font-medium mt-8 font-serif p-10 pl-20">
                    <Heading title="Doctors"/>
                </div>
                <div className="flex justify-around w-100 mb-10 transition duration-200 ease-in hover:scale-105 item-center">
                    <div className="bg-white rounded-2xl border mt-7 hover:shadow-lg">
                        {["ALL", "CARDIOLOGY", "ORTHOPEDICS", "CONCOLOGY", "DERMETOLOGY", "SURGERY", "GYNOCOLOGY"].map(specialty => (
                            <button key={specialty} 
                                    className={`py-4 px-8 text-xs hover:underline hover:bg-gradient-to-r from-cyan-500 to-blue-500 hover:text-white hover:rounded-2xl ${selectedSpecialty === specialty ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-2xl' : ''}`} 
                                    onClick={() => handleSpecialtyChange(specialty)}>
                                {specialty}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-5">
                {filteredUsers.map(user => (
                    <DoctorCard key={user._id} onClick={() => handleOnClick(user.email, user.fullname)} name={user.fullname} email={user.email} description={"Sample Description"} speciality={user.speciality}/>
                ))}
            </div>
        </div>
    );
};
