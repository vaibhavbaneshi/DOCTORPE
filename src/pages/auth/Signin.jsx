import React, { useState } from 'react'
import {Heading}  from '../../components/Form/Heading.jsx'
import { SubHeading } from "../../components/Form/SubHeading.jsx"
import { InputBox } from "../../components/Form/InputBox.jsx"
import { Button } from "../../components/Form/Button.jsx"
import { BottomWarning } from "../../components/Form/BottomWarning.jsx"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Logo } from '../../components/Form/Logo.jsx'


function Signin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

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
            <Button onClick={async () => {
              const response = await axios.post("http://localhost:3000/api/v1/auth/signin", {
                email,
                password
              })
              localStorage.setItem("token", response.data.token)
              if(localStorage.getItem("token")) {
                console.log("Not expired");
              } else {
                localStorage.setItem("token", response.data.token)

              }
              if(response.data.status) {
                navigate("/")
              } else {
                setErrorMessage(response.data.msg)
              }
            }} label={"Sign in"}/>
            <BottomWarning label={"Dont't have an account?"} to={"/signup"} text={"Sign Up"}/>
          </div>
        </div>
    </div>
  )
}

export default Signin