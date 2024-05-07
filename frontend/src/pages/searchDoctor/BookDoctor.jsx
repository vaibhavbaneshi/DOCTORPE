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
import DoctorLoadingCard from "../../components/Card/DoctorLoadingCard.jsx";
import './DoctorLocation.css'

const initLocations = [
    {
        place: "Raipur",
        city: "Raipur"
    },
    {
        place: "Delhi",
        city: "Delhi"
    },
    {
        place: "Indore",
        city: "Indore"
    },
    {
        place: "Sapna Sangeeta",
        city: "Indore"
    },
    {
        place: "Ab Road",
        city: "Indore"
    },
    {
        place: "Lig Colony",
        city: "Indore"
    },
    {
        place: "Sudama Nagar",
        city: "Indore"
    },
]

export const BookDoctor = () => {
    const [users, setUsers] = useState([]);
    const [selectedSpecialty, setSelectedSpecialty] = useState("ALL");
    const [selectedDateTime, setSelectedDateTime] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [toDeleteappointments, setToDeleteAppointments] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [showError, setShowError] = useState(false);
    const { currentUser } = useSelector(state => state.user);
    const [IsLoading,setIsLoading] =useState(true);

    const [searchLocation, setSearchLocation] = useState('');
    const [locationResultHidden, setLocationResultHidden] = useState(true);


    useEffect(() => {
        axios.get("https://doctorpe-backend.vercel.app/api/v1/user/searchDoctor")
            .then(response => {
                setUsers(response.data); 
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);

    useEffect(() => {
        axios.get("https://doctorpe-backend.vercel.app/api/v1/user/fetchAppointment")
            .then(response => {
                setToDeleteAppointments(response.data); 
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);

    setTimeout(() => {
        setIsLoading(false)
    }, 1000)

    setInterval(async () => {
        const currentDate = new Date();
        var year = currentDate.getFullYear();
        var month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        var date = currentDate.getDate().toString().padStart(2, '0');
        var formattedDate = year + '-' + month + '-' + date;
        for (const appointment of toDeleteappointments) {            
            if (appointment.date < formattedDate) {
                try {
                    await axios({
                        method: 'delete',
                        url: `https://doctorpe-backend.vercel.app/api/v1/user/deleteAppointment`,
                        data: { appointmentId: appointment._id }
                    });                    
                    console.log(`Appointment ${appointment._id} deleted because its date and time have passed.`);
                } catch (error) {
                    console.error('Error deleting appointment:', error);
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
            await axios.post("https://doctorpe-backend.vercel.app/api/v1/user/bookAppointment", {
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

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
        setIsLoading(true)

    },[searchLocation])

    setTimeout(() => {
        setShowAlert(false)
        setShowError(false)
    }, 5000)

    return (
        <div className="bg-gradient-to-br from-slate-100 to-cyan-100  min-h-screen w-full py-2 mx-auto px-6">
            {showError && <ErrorMessage message="Please select Date and Time" />}
            {showAlert && <SuccessMessage message={`Your Appointment has been scheduled and details have been sent to your email : ${currentUser.data.email}`} />}
            
            <div className="">
                <div className="text-2xl font-medium font-serif p-10 pl-20">
                    <Heading title="Doctors" preText={'Our'}/>
                </div>
                    <div className="flex justify-around w-100   item-center">
                        <div className="transition duration-700 ease-in-out transform hover:scale-105 hover:cursor-pointer hover:shadow-2xl hover:shadow-cyan-500  rounded-3xl p-3 bg-white hover:underline ">
                            {["ALL", "CARDIOLOGY", "ORTHOPEDICS", "CONCOLOGY", "DERMATOLOGY", "SURGERY", "GYNOCOLOGY"].map(specialty => (
                                <button key={specialty} 
                                        className={`py-4 px-8 text-xs hover:underline  hover:text-cyan-400 hover:rounded-2xl  ${selectedSpecialty === specialty ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:text-cyan-50 rounded-2xl' : ''}`} 
                                        onClick={() => handleSpecialtyChange(specialty)}>
                                    {specialty}
                                </button>
                            ))}
                        </div>
                    </div>
            </div>
           <div className="flex  justify-center  pt-20">
            <div className="flex flex-col items-center  -mb-6">
                <Calendar onDateTimeSelect={handleDateTimeSelection} onAppointments={handleAppointments}/>
            </div>

            <div className="home-search-container ml-8 shadow-lg">
                    <div className="location-search-box ">
                        <img className=" bg-gradient-to-r from-cyan-500 to-blue-500 pr-1 border-black p-1" src={'./images/location-icon.png'} alt="" width="40" />
                        <input type="text" className="search-location-input-box rounded-r-lg" placeholder="Search location" onFocus={() => setLocationResultHidden(false)} onBlur={() => setLocationResultHidden(true)} value={searchLocation} onChange={(e) => setSearchLocation(e.target.value)} />
                        <div className="search-location-input-results" hidden={locationResultHidden}>
                            {
                                initLocations.map(location => (
                                    <div className="search-location-result-item" key={location.place} onMouseDown={() => setSearchLocation(location.place)}>
                                        <span>
                                            <img src={'../../../images/search.svg'} alt="" width="20" />
                                        </span>
                                        <span>
                                            <div>{location.place}</div>
                                            <div>{location.city}</div>
                                            <button 
                                                className="hover:cursor-pointer rounded-lg px-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-cyan-400 text-white"
                                            >Select</button>
                                        </span>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            
            </div>

               {IsLoading?<div className="grid grid-cols-5"><DoctorLoadingCard/><DoctorLoadingCard/><DoctorLoadingCard/><DoctorLoadingCard/><DoctorLoadingCard/><DoctorLoadingCard/><DoctorLoadingCard/><DoctorLoadingCard/><DoctorLoadingCard/><DoctorLoadingCard/></div>: <div className="grid grid-cols-5">
                    {availableUsers.map(user => (
                        <DoctorCard key={user._id} onClick={() => handleOnClick(user._id, user.email, user.fullname, selectedDateTime)} name={user.fullname} email={user.email} description={"Sample Description"} speciality={user.speciality} label={"Schedule Appointment"}/>
                    ))}
                </div>}

            <div>
                <ChatBotButton />
            </div>
        </div>
    );
};