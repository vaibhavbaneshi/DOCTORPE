import React, { useState } from 'react';
import { Heading } from '../../components/Form/Heading.jsx';
import { SubHeading } from "../../components/Form/SubHeading.jsx";
import { InputBox } from "../../components/Form/InputBox.jsx";
import { Button } from "../../components/Form/Button.jsx";
import { BottomWarning } from "../../components/Form/BottomWarning.jsx";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../../components/Form/Logo.jsx';
import OAuth from '../../components/OAuth/OAuth.jsx';
import { signInFailure, signInStart, signInSuccess } from '../../redux/user/userSlice.js';
import { useDispatch } from 'react-redux';
import { ErrorMessage } from '../../components/Alert/ErrorMessage.jsx';

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showError, setShowError] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Reset errors

    try {
      dispatch(signInStart());
      const response = await axios.post(`https://doctorpe-backend.vercel.app/api/v1/auth/signup`, {
        firstName,
        lastName,
        username,
        email,
        password
      });

      const data = response.data;
      localStorage.setItem("token", data.token);

      if (data.success === false) {
        setErrors({ general: data.message });
        dispatch(signInFailure(data.message));
        return;
      }

      if (data.status) {
        dispatch(signInSuccess(data));
        window.location.href = '/';
      }
    } catch (error) {
      setErrors({ general: error.message });
      setShowError(true)
      dispatch(signInFailure(error.message));
    }
  };

  setTimeout(() => {
    setShowError(false)
  }, 5000)

  return (
    <div className='flex justify-center h-full'>
      <div className='flex justify-center'>
        <div className='bg-white rounded-lg mb-10 w-3/4 h-max p-8 px-8'>
        {showError && <ErrorMessage message="User with this email or username already exist" />}
          <Logo />
          <Heading label={"Sign Up"} />
          <SubHeading text={"Enter your information to create an account"} />
          <InputBox
            onChange={e => setFirstName(e.target.value)}
            placeholder={"John"}
            label={"First Name"}
            error={errors.firstName}
          />
          <InputBox
            onChange={e => setLastName(e.target.value)}
            placeholder={"Doe"}
            label={"Last Name"}
            error={errors.lastName}
          />
          <InputBox
            onChange={e => setUsername(e.target.value)}
            placeholder={"johndoe"}
            label={"Username"}
            error={errors.username}
          />
          <InputBox
            onChange={e => setEmail(e.target.value)}
            placeholder={"example@gmail.com"}
            label={"Your Email"}
            error={errors.email}
          />
          <InputBox
            onChange={e => setPassword(e.target.value)}
            placeholder={"*******"}
            label={"Password"}
            type="password"
            error={errors.password}
          />
          {errors.general && <p className="text-red-500 text-sm">{errors.general}</p>}
          <Button onClick={handleSubmit} label={"Sign up"} />
          <div className='flex justify-center'>
            <OAuth />
          </div>
          <BottomWarning label={"Have an account?"} to={"/signin"} text={"Sign In"} />
        </div>
      </div>
    </div>
  );
}

export default Signup;
