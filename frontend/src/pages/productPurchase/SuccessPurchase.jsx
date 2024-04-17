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

    const loggedInPatientEmail = currentUser.data.email;
    const loggedInPatientfullname = currentUser.data.firstName + ' ' + currentUser.data.lastName;

    useEffect(() => {
        dispatch(successOrder())
    
        sendDelivery(loggedInPatientfullname, loggedInPatientEmail, totalItems, totalAmount);
    }, [])

    setTimeout(() => {
        navigate('/shoppingCart')
    }, 5000)
    
    return <>
        {<SuccessMessage message={`Order placed successfully and order details have been sent to your email : ${currentUser.data.email}`} />}
    </>
}
