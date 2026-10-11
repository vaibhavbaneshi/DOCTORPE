import { useState } from 'react'
import {Heading}  from '../../components/Form/Heading.jsx'
import { SubHeading } from "../../components/Form/SubHeading.jsx"
import { InputBox } from "../../components/Form/InputBox.jsx"
import { Button } from "../../components/Form/Button.jsx"
import { BottomWarning } from "../../components/Form/BottomWarning.jsx"
import { useNavigate } from 'react-router-dom'
import { Logo } from '../../components/Form/Logo.jsx'
import OAuth from '../../components/OAuth/OAuth.jsx'
import { signInFailure, signInStart, signInSuccess } from '../../redux/user/userSlice.js'
import { useDispatch, useSelector } from 'react-redux'
import { api } from '../../lib/api.js'


function Signup() {

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.user)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      dispatch(signInStart())
      const response = await api.post("/auth/signup", {
        firstName,
        lastName,
        username,
        email,
        password
      })

      const data = response.data

      if(!data.status) {
        dispatch(signInFailure(data.message))
        return
      }

      localStorage.setItem("token", data.token);
      dispatch(signInSuccess(data))
      navigate('/')
    } catch (err) {
      dispatch(signInFailure(err.response?.data?.message || err.message))
    }
  }

  return (
    <div className="flex min-h-[80dvh] justify-center px-4 py-10">
        <div className="mb-10 w-full max-w-md rounded-[2rem] p-1.5 ring-1 ring-ink/5">
        <form onSubmit={handleSubmit} className="rounded-[1.6rem] bg-surface p-8">
          <Logo />
          <Heading label={"Create account"} />
          <SubHeading text={"Enter your information to create an account"} />
          <InputBox name="firstName" id="firstName" autoComplete="given-name" value={firstName} onChange={e => { setFirstName(e.target.value) }} placeholder={"Ananya…"} label={"First name"}/>
          <InputBox name="lastName" id="lastName" autoComplete="family-name" value={lastName} onChange={e => { setLastName(e.target.value) }} placeholder={"Rao…"} label={"Last name"}/>
          <InputBox name="username" id="username" autoComplete="username" spellCheck={false} value={username} onChange={e => { setUsername(e.target.value) }} placeholder={"ananyarao…"} label={"Username"}/>
          <InputBox type="email" name="email" id="email" autoComplete="email" spellCheck={false} value={email} onChange={e => { setEmail(e.target.value) }} placeholder={"you@clinic.com…"} label={"Email"}/>
          <InputBox type="password" name="password" id="password" autoComplete="new-password" value={password} onChange={e => { setPassword(e.target.value) }} placeholder={"At least 6 characters…"} label={"Password"}/>
          {error && <p className="text-sm text-red-700" aria-live="polite">{error}. Check the fields and try again.</p>}
          <Button type="submit" disabled={loading} label={loading ? "Creating account…" : "Sign up"}/>
            <div className='flex justify-center'>
              <OAuth />
            </div>
          <BottomWarning label={"Have an account?"} to={"/signin"} text={"Sign In"}/>
        </form>
        </div>
    </div>
  )
}

export default Signup
