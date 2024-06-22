import { useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import { useSelector, useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { register, verifyEmail } from '../api-client';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { IoReload } from "react-icons/io5";
import { setToken, setUserId } from "../Store/slices/authSlice"

function VerifyEmail() {
  const [otp, setOtp] = useState('');
  const signupData = useSelector((state) => state.signup)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(()=> {
    if(!signupData) {
       navigate("/register") 
    }
  }, [signupData])

  const mutation = useMutation({
    mutationKey: ["register"],
    mutationFn: register,
    onSuccess: (data) => {
      toast.success("User registered");
      navigate("/")

      //store token & userId  in the state & local storage
      localStorage.setItem("auth_token", data.auth_token)
      localStorage.setItem("userId", data.userId)

      dispatch(setToken(data.auth_token))
      dispatch(setUserId(data.userId))
    },
    onError: (error) => {
      toast.error(error.message)
      navigate("/register")
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signupData;


    mutation.mutate({email, password, confirmPassword, firstName, lastName, otp})
  }

  const sendOtp = useMutation({
    mutationKey: ["sendOtp"],
    mutationFn: verifyEmail,
    onSuccess: async() => {
      toast.success("OTP sent")
      navigate("/verify-email")
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const resendOtp = () => {
    const { email } = signupData;

    sendOtp.mutate(email)
    setOtp("")
  }

  return (
    <div className='flex flex-col justify-center items-center gap-10'>
      <h1 className='text-4xl text-blue-600 font-bold'>Verify Email</h1>

      <div className='text-4xl'>
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={4}
          renderInput={(props) => <input {...props} />}
          inputStyle={{backgroundColor: "#B3C8CF", borderRadius: "5px", borderRight: "1px solid black", borderBottom: "1px solid black", margin: "0 5px", padding: "7px", width: "50px"}} 
        />
      </div>

      <div>
        <button
          className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
          onClick={handleSubmit}
        >
          Verify Email
        </button>
      </div>

      <div className='flex items-center gap-2 cursor-pointer' onClick={resendOtp}>
          <IoReload />
          Resent OTP
      </div>
    </div>
  )
}

export default VerifyEmail