import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

function Header() {

  const { token } = useSelector((state) => state.auth)

  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to={"/"}>MernHolidays.com</Link>
        </span>

        <span className="flex space-x-2">
          {
            token ? ( 
              <>
                <Link to={"/my-bookings"}>My Bookings</Link>
                <Link to={"/my-hotels"}>My Hotels</Link>
                <button>Sign out</button>
              </>
            ) : (
              <Link to={"/register"} className="flex items-center text-blue-600 px-3 font-bold bg-white hover:bg-gray-100 hover:text-green-500">Sign In</Link>
            )
          }
        </span>
      </div>
    </div>
  )
}

export default Header