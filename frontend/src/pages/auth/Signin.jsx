import React, { useState } from 'react'
import {Heading}  from '../../components/Form/Heading.jsx'
import { SubHeading } from "../../components/Form/SubHeading.jsx"
import { InputBox } from "../../components/Form/InputBox.jsx"
import { Button } from "../../components/Form/Button.jsx"
import { BottomWarning } from "../../components/Form/BottomWarning.jsx"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Logo } from '../../components/Form/Logo.jsx'
import OAuth from '../../components/OAuth/OAuth.jsx'
import { useDispatch } from 'react-redux'
import { signInFailure, signInStart, signInSuccess } from '../../redux/user/userSlice.js'


function Signin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      dispatch(signInStart());
    
      const response = await axios.post("https://doctorpe-backend.vercel.app/api/v1/auth/signin", {
        email,
        password
      });
      
      const data = response.data
      localStorage.setItem("token", data.token);
    
      if(data.status === false) {
        dispatch(signInFailure(data.message))
      }

      if(data.status) {
        dispatch(signInSuccess(data))
        window.location.href = '/'
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  }

  return (
    <div className='flex justify-center  h-full'>
        <div className='flex  justify-center'>
          <div className='bg-white rounded-lg  w-3/4 h-max p-8 px-8'>
            <Logo/>
          <Heading label={"Sign In"} />
          <SubHeading text={"Enter your information to sign-in"} />

            <InputBox onChange={e => {
              setEmail(e.target.value)
            }} placeholder={"example@gmail.com"} label={"Your Email"}/>

            <InputBox onChange={e => {
              setPassword(e.target.value)
            }} placeholder={"*******"} label={"Password"}/>

            <Button onClick={handleSubmit} label={"Sign in"}/>

            <div className='flex justify-center'>
              <OAuth />
            </div>

            <BottomWarning label={"Dont't have an account?"} to={"/signup"} text={"Sign Up"}/>
          </div>
        </div>
    </div>
  )
}

export default Signin