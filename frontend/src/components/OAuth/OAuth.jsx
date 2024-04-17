import { Button } from 'flowbite-react'
import React from 'react'
import { AiFillGoogleCircle } from 'react-icons/ai'
import {GoogleAuthProvider, signInWithPopup, getAuth} from "firebase/auth"
import {app} from "./firebase.js"
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signInSuccess } from '../../redux/user/userSlice.js'

function OAuth() {
    const auth = getAuth(app)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const handleGoogleClick = async () => {
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({prompt: 'select_account'})

        try {
            const resultFromGoogle = await signInWithPopup(auth, provider)
            const fullName = resultFromGoogle.user.displayName;
            const nameParts = fullName.split(" ");

            let firstName, lastName;

            firstName = nameParts[0];
            lastName = nameParts[nameParts.length - 1];
            
            const res = await fetch(`http://localhost:3000/api/v1/auth/google`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: resultFromGoogle.user.displayName,
                    firstName: firstName,
                    lastName: lastName,
                    email: resultFromGoogle.user.email,
                    googlePhotoURL: resultFromGoogle.user.photoURL
                })
            })
            
            const data = await res.json()
            localStorage.setItem("token", data.token);

            if(res.ok) {
                dispatch(signInSuccess(data))
                window.location.href = '/'
            }

        } catch (error) {
            console.log(error);
        }
    }
  return (
    <>
        <Button className='bg-white text-black hover:underline hover:bg-gradient-to-r from-cyan-500 to-blue-500  hover:text-white' type="button" onClick={handleGoogleClick}>
            <AiFillGoogleCircle className='w-6 h-6 mr-2'/>
            Continue with Google
        </Button>
    </>
  )
}

export default OAuth