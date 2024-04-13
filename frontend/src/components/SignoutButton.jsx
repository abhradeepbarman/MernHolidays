import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import * as apiClient from "../api-client"

function SignoutButton() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleClick = async() => {
      console.log("start");
      apiClient.signout(dispatch, navigate)
      console.log("end");
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