import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { successOrder } from '../../redux/user/userSlice';
import { sendDelivery } from "../../components/Email/EmailSend";
import { useNavigate, useParams } from 'react-router-dom'
import { SuccessMessage } from "../../components/Alert/SuccessMessage";

export const SuccessPurchase = ({ itemTotal, itemAmount }) => {
    const { totalItems, totalAmount, currentUser } = useSelector(state => state.user);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const [ count, setCount ] = useState(7);
    const [showAlert, setShowAlert] = useState(true);

    const loggedInPatientEmail = currentUser.data.email;
    const loggedInPatientfullname = currentUser.data.firstName + ' ' + currentUser.data.lastName;

    useEffect(() => {
        dispatch(successOrder())
    
        sendDelivery(loggedInPatientfullname, loggedInPatientEmail, totalItems, totalAmount);
    }, [])

    useEffect(() => {
        let timeoutId;
    
        const countdown = () => {
            setCount(prevCount => prevCount - 1);
            if (count === 1) {
                clearTimeout(timeoutId);
                navigate('/shoppingCart')
            }
        };
    
        if (showAlert) {
            timeoutId = setInterval(countdown, 1000);
        }
    
        return () => clearInterval(timeoutId);
    }, [showAlert, count]);
    
    return <>
        {showAlert && (
                <div className="ml-96 bg-green-200 border border-green-400 text-green-700 px-4 py-3 rounded mt-4 sticky top-0 z-10 inline-block">
                    <div className="flex items-center">
                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <p className="font-bold pr-3">Success alert!</p>
                        <p>Order placed successfully and order details have been sent to your email : ${currentUser.data.email}</p>
                    </div>

                    <div className="flex justify-center">
                        <p className="">Redirecting in : {count}</p>
                    </div>
                </div>
            )}
    </>
}
