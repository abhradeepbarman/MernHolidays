import { useForm } from "react-hook-form"
import {Link, useLocation, useNavigate} from "react-router-dom"
import { signIn } from "../api-client";
import { QueryClient, useMutation } from '@tanstack/react-query';
import toast from "react-hot-toast";
import { useDispatch } from 'react-redux';
import { setToken, setUserId } from "../Store/slices/authSlice";
import {useCookies} from "react-cookie"


const queryClient = new QueryClient()

function SignIn() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const location = useLocation()
    const [cookies, setCookie] = useCookies("auth_token")

    const {
        register,
        handleSubmit,
        formState:{errors},
        setValue
    } = useForm()

    const mutation = useMutation({
      mutationFn: signIn,
      onSuccess: async(data) => {
            
        //store token in the state & local storage
        localStorage.setItem("auth_token", data.auth_token)
        dispatch(setToken(data.auth_token))
        
        //store user Id in state & local storage
        localStorage.setItem("userId", data.userId)
        dispatch(setUserId(data.userId))

        //save cookie
        // const expirationDate = new Date();
        // expirationDate.setDate(expirationDate.getDate() + 30);

        // setCookie("auth_token", data.auth_token, {
        //   expires: expirationDate,
        //   secure: import.meta.env.VITE_ENV_NODE_ENV === "production",
        // })

        await queryClient.invalidateQueries("validateToken"),

        toast.success("Sign in Successful!")
        navigate( location?.state?.from?.pathname || "/")
      },
      onError: (error) => {
        toast.error(error.message)
      }
    })


    const onsubmit = async(data) => {
      mutation.mutate(data)

      //clear the form
      setValue("email", "")
      setValue("password", "")
    }

  return (
    <form className="flex flex-col gap-5 px-2" onSubmit={handleSubmit(onsubmit)}>
        <h2 className="text-3xl font-bold">Sign In</h2>

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

        <label className="text-gray-700 text-sm font-bold flex-1">
          Password
          <input type="password" className="border rounded w-full py-1 px-2 font-normal" 
            {...register("password", {
              required: "This field is required", 
              minLength: {
                value: 6,
                message: "Password must be atleast 6 characters"
            }})}
          />
          {
            errors.password && (
              <span className="text-red-500">
                {errors.password.message}
              </span>
            )
          }
        </label>

        <span className="flex items-center justify-between">
          <span className="text-sm">
            Not Registered? <Link className="underline" to={"/register"}>Create an account here</Link>
          </span>

          <button type="submit" className={`${mutation.isPending ? "bg-blue-500 " : "bg-blue-600"} text-white p-2 font-bold hover:bg-blue-500 text-xl`} disabled={mutation.isPending}>
            Login
          </button>
        </span>
    </form>
  )
}

export default SignIn

