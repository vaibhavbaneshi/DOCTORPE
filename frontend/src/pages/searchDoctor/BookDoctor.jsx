import { useEffect, useState } from "react";
import { DoctorCard } from "../../components/Card/DoctorCard";
import axios from "axios";
import Heading from '../../components/products/Heading.jsx';
import { Calendar } from "../../components/Calender/Calender.jsx";
import { SuccessMessage } from "../../components/Alert/SuccessMessage.jsx";
import { ErrorMessage } from "../../components/Alert/ErrorMessage.jsx";
import { useSelector } from "react-redux";
import { sendDoctorBook, sendPatientBook } from "../../components/Email/EmailSend.js";
import ChatBotButton from "../../components/ChatBot/ChatBotButton.jsx";
import { SkeletonLoader } from "../../components/Loader/SkeletonLoader.jsx";

export const BookDoctor = () => {
    const [users, setUsers] = useState([]);
    const [selectedSpecialty, setSelectedSpecialty] = useState("ALL");
    const [selectedDateTime, setSelectedDateTime] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [toDeleteappointments, setToDeleteAppointments] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [showError, setShowError] = useState(false);
    const [checkAppointment, setCheckAppointment] = useState(true)
    const { currentUser } = useSelector(state => state.user);
    const [showLoader, setShowLoader] = useState(true)

    useEffect(() => {
        axios.get(`https://doctorpe-backend.vercel.app/api/v1/user/searchDoctor`)
            .then(response => {
                setUsers(response.data); 
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);

    useEffect(() => {
        axios.get(`https://doctorpe-backend.vercel.app/api/v1/user/fetchAppointment`)
            .then(response => {
                setToDeleteAppointments(response.data); 
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);

    let intervalId;

    intervalId = setInterval(async () => {
        const currentDate = new Date();
        var year = currentDate.getFullYear();
        var month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        var date = currentDate.getDate().toString().padStart(2, '0');
        var formattedDate = year + '-' + month + '-' + date;
        for (const appointment of toDeleteappointments) {            
            if (appointment.date < formattedDate) {
                try {
                    const response = await axios({
                        method: 'delete',
                        url: `https://doctorpe-backend.vercel.app/api/v1/user/deleteAppointment`,
                        data: { appointmentId: appointment._id }
                    });     
                    
                    console.log(`Appointment ${appointment._id} deleted because its date and time have passed.`);
                } catch (error) {
                    clearInterval(intervalId)
                    console.error('Error deleting appointment:', error);
                    break;
                }
            }
        }
    }, 10000);    

    const filteredUsers = selectedSpecialty === "ALL" ? users : users.filter(user => user.speciality === selectedSpecialty);

    const availableUsers = filteredUsers.filter(user => {
           
        const isBooked = appointments.some(appointment => {
               
            return (
                appointment.doctorId === user._id &&
                appointment.date === selectedDateTime.date &&
                appointment.time === selectedDateTime.time
            );
        });
        
        return !isBooked;
    });
    

    const handleOnClick = async (doctorId, doctorEmail, doctorFullname, selectedDateTime) => {
        if(!selectedDateTime) {
            setShowError(true)
            return
        }
        try {
            await axios.post(`https://doctorpe-backend.vercel.app/api/v1/user/bookAppointment`, {
                doctorId, 
                date: selectedDateTime.date, 
                time: selectedDateTime.time 
            });

            const loggedInPatientEmail = currentUser.data.email;
            const loggedInPatientfullname = currentUser.data.firstName + ' ' + currentUser.data.lastName;

            setShowAlert(true)
            sendDoctorBook(doctorEmail, doctorFullname, loggedInPatientfullname, selectedDateTime.date, selectedDateTime.time)
            sendPatientBook(loggedInPatientEmail, loggedInPatientfullname, doctorFullname, selectedDateTime.date, selectedDateTime.time)
        } catch (error) {
            console.error("Error occurred:", error); 
        }
    };

    const handleSpecialtyChange = (specialty) => {
        setSelectedSpecialty(specialty);
    };

    const handleDateTimeSelection = (date, time) => {
        setSelectedDateTime({ date, time });
    };

    const handleAppointments = (bookedAppointments) => {
        setAppointments(bookedAppointments)
    };

    setTimeout(() => {
        setShowAlert(false)
        setShowError(false)
    }, 5000)

    setTimeout(() => {
        setShowLoader(false)
    }, 5000)

    return (
        <div className="bg-gradient-to-br from-slate-100 to-cyan-100  h-full w-full py-2 mx-auto px-6">
            {showError && <ErrorMessage message="Please select Date and Time" />}
            {showAlert && <SuccessMessage message={`Your Appointment has been scheduled and details have been sent to your email : ${currentUser.data.email}`} />}
            
            <div className="">
                <div className="text-2xl font-medium font-serif p-10 pl-20">
                    <Heading title="Doctors" preText={'Our'}/>
                </div>
                {/* <Flash> */}
                    <div className="flex justify-around w-100   item-center">
                        <div className="transition duration-700 ease-in-out transform hover:scale-105 hover:cursor-pointer hover:shadow-2xl hover:shadow-cyan-500  rounded-3xl p-3 bg-white hover:underline ">
                            {["ALL", "CARDIOLOGY", "ORTHOPEDICS", "CONCOLOGY", "DERMETOLOGY", "SURGERY", "GYNOCOLOGY"].map(specialty => (
                                <button key={specialty} 
                                        className={`py-4 px-8 text-xs hover:underline  hover:text-cyan-400 hover:rounded-2xl  ${selectedSpecialty === specialty ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:text-cyan-50 rounded-2xl' : ''}`} 
                                        onClick={() => handleSpecialtyChange(specialty)}>
                                    {specialty}
                                </button>
                            ))}
                        </div>
                    </div>
                {/* </Flash> */}
            </div>

            <div className="flex flex-col items-center pt-12 -mb-6">
                <Calendar onDateTimeSelect={handleDateTimeSelection} onAppointments={handleAppointments}/>
            </div>
            {/* <Flash> */}

            <div className="flex items-center justify-center px-6 py-2">
            {showLoader ? <SkeletonLoader/> : <div className="grid grid-cols-5 ">
                    {filteredUsers.map(user => (
                        user.isAvailable ? <DoctorCard key={user._id} onClick={() => handleOnClick(user.email, user.fullname)} name={user.fullname} email={user.email} description={"Sample Description"} speciality={user.speciality} label={"Consult Now"}/> : <></>
                    ))}
                </div>}
            </div>

            {/* </Flash> */}

            <div>
                <ChatBotButton />
            </div>
        </div>
    );
};