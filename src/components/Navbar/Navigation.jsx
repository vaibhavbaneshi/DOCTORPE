import "./Navigation.css";
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button, Dropdown } from "flowbite-react";
import { signOut } from "../../redux/user/userSlice";

export const Navigation = () => {
    const navigate = useNavigate()

    const { currentUser } = useSelector(state => state.user) 
    
    const dispatch = useDispatch()
    
    
    const handleSignout = () => {
        localStorage.removeItem("token")
        dispatch(signOut())
        navigate("/signin")
    }

    return <div className="navbar-area ">
        <nav className="nav-container  justify-around">
            <Link to="/">
            <div className="div-nav-left">
                <img src={'../../../images/dpe3w.png'} alt="DoctorPe" className='nav-logo' />
            </div>
            </Link>
            <div className="div-nav-middle">

                <Link to="/">
                <div className="div-nav-middle-item">
                    <div>Home</div>
                    <div>Doctorपे</div>
                </div>
                </Link>

                <Link to="/searchDoctor">
                <div className="div-nav-middle-item">
                    <div>Find Doctors</div>
                    <div>Book an appointment</div>
                </div>
                </Link>
                <Link to="/searchDoctor">
                <div className="div-nav-middle-item">
                    <div>Video Consult</div>
                    <div>Consult top doctors</div>
                </div>
                </Link>
                <Link to="/medicines">
                    <div className="div-nav-middle-item">
                        <div>Medicines</div>
                        <div>Doctorपे Pharmacy</div>
                    </div>
                </Link>
                <Link to="/Ai_Lab">
                    <div className="div-nav-middle-item">
                        <div>AI Lab</div>
                        <div>Artificial Lab Test</div>
                    </div>
                </Link>
            </div>
            <div className="div-nav-right flex">
                {
                    currentUser ? (

                        <>
                        <Dropdown arrowIcon={false} inline label={<Avatar alt="user" img={currentUser.data.profilePicture} rounded/>}>
                            <Dropdown.Header>
                                <span className='block text-sm'>@{currentUser.data.username}</span>
                                <span className='block text-sm font-medium truncate'>{currentUser.data.email}</span>
                            </Dropdown.Header>

                            <Link to={'/dashboard?tab=profile'}>
                                <Dropdown.Item>Profile</Dropdown.Item>
                            </Link>

                            <Dropdown.Divider />
                        </Dropdown>
                        
                        <button className="ml-10 bg-red-500 rounded-xl px-3 text-white hover:underline" onClick={handleSignout}>Sign Out</button>

                        </>
                    ) : (
                        
                        <div className="flex">
                            <button onClick={() => navigate("/signin")} className="btn-login mr-4 hover:underline hover:border hover:border-blue-600">
                                Login
                            </button>
                            <button onClick={() => navigate("/signup")} className="btn-login hover:underline hover:border hover:border-blue-600">
                                Signup
                            </button>
                        </div>
                    )
                }
            </div>
        </nav>
    </div>
}