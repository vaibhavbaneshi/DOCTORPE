import "./Navigation.css";
import { Link, useNavigate } from 'react-router-dom'; 
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Dropdown } from "flowbite-react";
import { signOut } from "../../redux/user/userSlice";
import { Cart } from "../Cart/Cart";
import { useEffect, useState } from "react";
import { ErrorMessage } from "../Alert/ErrorMessage";

export const Navigation = () => {
    const navigate = useNavigate(); 
    const [tokenPresent, setTokenPresent] = useState(false);
    const [showError, setShowError] = useState(false);
    const [showCart, setShowCart] = useState(false);

    const { currentUser } = useSelector(state => state.user); 
    
    const dispatch = useDispatch();
        
    const handleSignout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("conversation");
        dispatch(signOut());
        window.location.href = '/signin'; 
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
    
        if (token) {
            setTokenPresent(true);
            setShowCart(true);
            setShowError(false);
        } else {
            setTokenPresent(false);
            setShowCart(false);
            setShowError(true);
            navigate("/signin");
        }
    }, []);
    

    // Higher Order Component (HOC) to check token and redirect
    const SecureLink = ({ to, children }) => {
        const handleClick = () => {
            if (!tokenPresent) {
                setShowError(true)
                setShowCart(false)
                navigate("/signin");
            } else {
                setShowError(false)
                setShowCart(true)
                navigate(to);
            }
        };

        return (
            <div onClick={handleClick}>
                {children}
            </div>
        );
    };

    const handleHomeLink = () => {
        setShowError(false)
    }

    setTimeout(() => {
        setShowError(false)
    }, 5000)

    return (
        <>
            <div className="navbar-area  ">
            <nav className="nav-container justify-around w-full ">
                <Link to="/">
                    <div className="div-nav-left">
                        <img src={'../../../images/dpe3w.png'} alt="DoctorPe" className='nav-logo' />
                    </div>
                </Link>
                <div className="div-nav-middle ">
                    <Link onClick={handleHomeLink} to="/">
                        <div className="div-nav-middle-item hover:underline hover:scale-110">
                            <div>Home</div>
                            <div>Doctorपे</div>
                        </div>
                    </Link>
                    <SecureLink to="/bookDoctor">
                        <div className="div-nav-middle-item hover:underline hover:scale-110">
                            <div className="flex flex-col items-center">Find Doctors</div>
                            <div>Book an appointment</div>
                        </div>
                    </SecureLink>
                    <SecureLink to="/searchDoctor">
                        <div className="div-nav-middle-item hover:underline hover:scale-110">
                            <div>Video Consult</div>
                            <div className="flex flex-col items-center">Consult top doctors</div>
                        </div>
                    </SecureLink>
                    <SecureLink to="/medicines">
                        <div className="div-nav-middle-item hover:underline hover:scale-110">
                            <div>Medicine Store</div>
                            <div className="flex flex-col items-center">Doctorपे Pharmacy</div>
                        </div>
                    </SecureLink>
                    <SecureLink to="/Ai_Lab">
                        <div className="div-nav-middle-item hover:underline hover:scale-110">
                            <div>AI Lab Test</div>
                            <div>Artificial Lab Test</div>
                        </div>
                    </SecureLink>
                </div>
                {showCart && <Cart />}
                <div className="div-nav-right flex justify-end">
                    {currentUser ? (
                        <>
                            <Dropdown arrowIcon={false} inline label={<Avatar alt="user" img={currentUser.data.profilePicture} rounded/>}>
                                <Dropdown.Divider />
                                <Dropdown.Header>
                                    <span className='block text-sm'>{currentUser.data.firstName + ' ' + currentUser.data.lastName}</span>
                                </Dropdown.Header>
                                <Dropdown.Divider />
                                <Dropdown.Header>
                                    <span className='block text-sm font-medium truncate'>{currentUser.data.email}</span>
                                </Dropdown.Header>
                            </Dropdown>
                            <button className="ml-10 bg-red-500 rounded-xl px-3 text-white hover:underline" onClick={handleSignout}>Sign Out</button>
                        </>
                    ) : (
                        <div className="flex">
                            <button onClick={() => navigate("/signin")} className="transition duration-700 ease-in-out transform hover:scale-105 btn-login mr-4 hover:underline hover:border hover:border-blue-600">
                                Login
                            </button>
                            <button onClick={() => navigate("/signup")} className="transition duration-700 ease-in-out transform hover:scale-105 btn-login hover:underline hover:border hover:border-blue-600">
                                Signup
                            </button>
                        </div>
                    )}
                </div>
                
            </nav>
        </div>
        {showError && <ErrorMessage message="Please Login First..." />}
        </>
    );
};