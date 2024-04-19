import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { signout } from "../api-client"
import { useMutation } from '@tanstack/react-query';
import { setToken, setUserId } from "../Store/slices/authSlice";
import toast from "react-hot-toast";

function SignoutButton() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const mutation = useMutation({
      mutationFn: signout,
      onSuccess: () => {
        //remove token & user id from local storage
        localStorage.removeItem("auth_token");
        localStorage.removeItem("userId");

        //remove token & user id from state
        dispatch(setToken(null))
        dispatch(setUserId(null))

        toast.success("Signed Out")
        navigate("/")
      },
      onError: (error) => {
        toast.error(error.message)
      }
    })

    const handleClick = async() => {
      mutation.mutate()
    }

  return (
    <button className="text-blue-600 px-3 font-bold bg-white hover:bg-gray-100"
        onClick={handleClick}
    >
        Sign Out
    </button>
  )
}

export default SignoutButton