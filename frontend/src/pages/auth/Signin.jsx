import { useState } from 'react'
import {Heading}  from '../../components/Form/Heading.jsx'
import { SubHeading } from "../../components/Form/SubHeading.jsx"
import { InputBox } from "../../components/Form/InputBox.jsx"
import { Button } from "../../components/Form/Button.jsx"
import { BottomWarning } from "../../components/Form/BottomWarning.jsx"
import { useLocation, useNavigate } from 'react-router-dom'
import { Logo } from '../../components/Form/Logo.jsx'
import OAuth from '../../components/OAuth/OAuth.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { signInFailure, signInStart, signInSuccess } from '../../redux/user/userSlice.js'
import { api } from '../../lib/api.js'


function Signin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const { error, loading } = useSelector((state) => state.user)
  const redirectTo = location.state?.from || "/"

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      dispatch(signInStart());

      const response = await api.post("/auth/signin", {
        email,
        password
      });

      const data = response.data

      if(data.status === false) {
        dispatch(signInFailure(data.message))
        return
      }

      localStorage.setItem("token", data.token);
      dispatch(signInSuccess(data))
      navigate(redirectTo)
    } catch (err) {
      dispatch(signInFailure(err.response?.data?.message || err.message));
    }
  }

  return (
    <div className='flex min-h-[80dvh] justify-center px-4 py-10'>
        <div className="w-full max-w-md rounded-[2rem] p-1.5 ring-1 ring-ink/5">
        <form onSubmit={handleSubmit} className='rounded-[1.6rem] bg-surface p-8'>
            <Logo/>
          <Heading label={"Sign in"} />
          <SubHeading text={"Enter your information to sign-in"} />

            <InputBox type="email" name="email" id="email" autoComplete="email" spellCheck={false} value={email} onChange={e => {
              setEmail(e.target.value)
            }} placeholder={"you@clinic.com…"} label={"Email"}/>

            <InputBox type="password" name="password" id="password" autoComplete="current-password" value={password} onChange={e => {
              setPassword(e.target.value)
            }} placeholder={"Your password…"} label={"Password"}/>

            {error && <p className="text-sm text-red-700" aria-live="polite">{error}. Check email and password, then try again.</p>}

            <Button type="submit" disabled={loading} label={loading ? "Signing in…" : "Sign in"}/>

            <div className='flex justify-center'>
              <OAuth />
            </div>

            <BottomWarning label={"Don't have an account?"} to={"/signup"} text={"Sign Up"}/>
        </form>
        </div>
    </div>
  )
}

export default Signin
