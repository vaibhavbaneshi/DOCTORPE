import { AiFillGoogleCircle } from 'react-icons/ai'
import {GoogleAuthProvider, signInWithPopup, getAuth} from "firebase/auth"
import {app} from "./firebase.js"
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signInFailure, signInStart, signInSuccess } from '../../redux/user/userSlice.js'
import { api } from '../../lib/api.js'
import { useLocation } from 'react-router-dom'

function OAuth() {
    const auth = getAuth(app)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const redirectTo = location.state?.from || "/"

    const handleGoogleClick = async () => {
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({prompt: 'select_account'})

        dispatch(signInStart())

        try {
            const resultFromGoogle = await signInWithPopup(auth, provider)
            const email = resultFromGoogle.user.email
            if (!email) {
                dispatch(signInFailure("Google did not return an email for this account."))
                return
            }

            const fullName = resultFromGoogle.user.displayName?.trim() || ""
            const nameParts = fullName.split(/\s+/).filter(Boolean)
            const firstName = nameParts[0] || email.split("@")[0] || "User"
            const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : firstName

            const { data } = await api.post('/auth/google', {
                name: fullName || `${firstName} ${lastName}`,
                firstName,
                lastName,
                email,
                googlePhotoURL: resultFromGoogle.user.photoURL
            })

            if(data.status) {
                localStorage.setItem("token", data.token);
                dispatch(signInSuccess(data))
                navigate(redirectTo)
            } else {
                dispatch(signInFailure(data.message || "Google sign-in failed"))
            }
        } catch (error) {
            const apiMessage = error.response?.data?.message
            dispatch(signInFailure(apiMessage || error.message || "Google sign-in failed"))
        }
    }
  return (
        <button className="mt-4 inline-flex min-h-11 items-center rounded-full border border-ink/15 px-5 py-2 text-ink hover:bg-ink/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-canopy" type="button" onClick={handleGoogleClick}>
            <AiFillGoogleCircle aria-hidden="true" className="mr-2 h-6 w-6"/>
            Continue with Google
        </button>
  )
}

export default OAuth
