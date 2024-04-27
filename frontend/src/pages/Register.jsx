import {useForm} from "react-hook-form"
import {useNavigate} from "react-router-dom"
import { useMutation } from '@tanstack/react-query';
import toast from "react-hot-toast";
import { register as signup } from "../api-client";
import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";

function Register() {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const { 
      register,
      handleSubmit,
      watch,
      formState: { errors },
      setValue,
    } = useForm();


    const mutation = useMutation({
      mutationFn: signup,
      onSuccess: async() => {
        toast.success("Registration success")
        navigate("/sign-in")
      },
      onError: (error) => {
        toast.error(error.message)
      }
    })

    const onsubmit = async(data) => {
      mutation.mutate(data)

       //clear the form
       setValue("firstName", "");
       setValue("lastName", "");
       setValue("email", "");
       setValue("password", "");
       setValue("confirmPassword", "");  
    }

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onsubmit)}>
        <h2 className="text-3xl font-bold">Create an Account</h2>

        <div className="flex flex-col md:flex-row gap-5">
          <label className="text-gray-800 text-sm font-bold flex-1">
            First Name
            <input type="text" className="border rounded w-full py-1 px-2 font-normal" 
              {...register("firstName", {required: "This field is required"})}
            />
            {
              errors.firstName && (
                <span className="text-red-500">
                  {errors.firstName.message}
                </span>
              )
            }
          </label>

          <label className="text-gray-700 text-sm font-bold flex-1">
            Last Name
            <input type="text" className="border rounded w-full py-1 px-2 font-normal" 
              {...register("lastName", {required: "This field is required"})}
            />
            {
              errors.lastName && (
                <span className="text-red-500">
                  {errors.lastName.message}
                </span>
              )
            }
          </label>
        </div>

        <label className="text-gray-700 text-sm font-bold flex-1">
          Email
          <input type="email" className="border rounded w-full py-1 px-2 font-normal" 
            {...register("email", {required: "This field is required"})}
          />
          {
              errors.email && (
                <span className="text-red-500">
                  {errors.email.message}
                </span>
              )
            }
        </label>

        <label className="text-gray-700 text-sm font-bold flex-1 relative">
          Password
          <input 
            type={`${showPassword ? "text" : "password"}`} 
            className="border rounded w-full py-1 px-2 font-normal" 
            {...register("password", {
              required: "This field is required", 
              minLength: {
                value: 6,
                message: "Password must be atleast 6 characters"
            }})}

          />
          <div onClick={() => setShowPassword(!showPassword)}
            className="cursor-pointer absolute top-6 right-5 text-xl" 
          >
            {
              showPassword 
                ? <IoEyeOff/> 
                : <IoEye />
            }
          </div>
          {
            errors.password && (
              <span className="text-red-500">
                {errors.password.message}
              </span>
            )
          }
        </label>

        <label className="text-gray-700 text-sm font-bold flex-1 relative">
          Confirm Password
          <input 
            type={`${showConfirmPassword ? "text" : "password"}`} 
            className="border rounded w-full py-1 px-2 font-normal" 
            {...register("confirmPassword", {
              validate: (val) => {
                if(!val) {
                  return "This field is required"
                }
                else if(watch("password") !== val) {
                  return "Your passwords do not match"
                }
              }
            })}
          />
          <div onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="cursor-pointer absolute top-6 right-5 text-xl" 
          >
            {
              showConfirmPassword 
                ? <IoEyeOff /> 
                : <IoEye />
            }
          </div>
          {
            errors.confirmPassword && (
              <span className="text-red-500">
                {errors.confirmPassword.message}
              </span>
            )
          }
        </label>

        <span>
          <button type="submit" className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl">
            Create Account
          </button>
        </span>
    </form>
  )
}

export default Register