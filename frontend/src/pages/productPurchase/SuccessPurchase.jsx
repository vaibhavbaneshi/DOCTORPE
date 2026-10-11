import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { successOrder } from '../../redux/user/userSlice';
import { sendDelivery } from "../../components/Email/EmailSend";
import { useNavigate } from 'react-router-dom'
import { SuccessMessage } from "../../components/Alert/SuccessMessage";

export const SuccessPurchase = () => {
    const { totalItems, totalAmount, currentUser } = useSelector(state => state.user);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const email = currentUser?.data?.email;
    const fullName = `${currentUser?.data?.firstName || ""} ${currentUser?.data?.lastName || ""}`.trim();

    useEffect(() => {
        dispatch(successOrder())
        if (email) {
            sendDelivery(fullName, email, totalItems, totalAmount);
        }
        const timer = setTimeout(() => navigate('/medicines'), 5000)
        return () => clearTimeout(timer)
    }, [])

    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
            <SuccessMessage message={`Order placed successfully. Details were sent to ${email || "your email"}.`} />
            <p className="mt-6 text-slate-600">Taking you back to the medicine store…</p>
        </div>
    )
}
