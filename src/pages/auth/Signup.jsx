import React, { useState } from 'react'
import {Heading}  from '../../components/Form/Heading.jsx'
import { SubHeading } from "../../components/Form/SubHeading.jsx"
import { InputBox } from "../../components/Form/InputBox.jsx"
import { Button } from "../../components/Form/Button.jsx"
import { BottomWarning } from "../../components/Form/BottomWarning.jsx"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Logo } from '../../components/Form/Logo.jsx'


function Signup() {

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  return (
    <div className='flex justify-center  h-full'>
      <div className='flex  justify-center  '>
        <div className='bg-white rounded-lg   mb-10 w-3/4 h-max p-8 px-8'>
          
          <Logo />
          <Heading label={"Sign Up"} />
          <SubHeading text={"Enter your information to create an account"} />
          <InputBox onChange={e => { setFirstName(e.target.value) }} placeholder={"John"} label={"First Name"}/>
          <InputBox onChange={e => { setLastName(e.target.value) }} placeholder={"Doe"} label={"Last Name"}/>
          <InputBox onChange={e => { setUsername(e.target.value) }} placeholder={"johndoe"} label={"Username"}/>
          <InputBox onChange={e => { setEmail(e.target.value) }} placeholder={"example@gmail.com"} label={"Your Email"}/>
          <InputBox onChange={e => { setPassword(e.target.value) }} placeholder={"*******"} label={"Password"}/>
          <Button onClick={async () => {
            const response = await axios.post("http://localhost:3000/api/v1/auth/signup", {
              firstName: firstName,
              lastName: lastName,
              username: username,
              email: email,
              password: password
            })
            localStorage.setItem("token", response.data.token)
            navigate("/")
          }} label={"Sign up"}/>
          <BottomWarning label={"Have an account?"} to={"/signin"} text={"Sign In"}/>
        </div>
      </div>
    </div>
  )
}

export default Signup