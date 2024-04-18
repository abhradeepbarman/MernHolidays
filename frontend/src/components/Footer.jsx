import { useState } from "react"
import { footerData } from "../config/footer-data";
import { Link } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { storeEmail } from "../api-client";

function Footer() {
  const [email, setEmail] = useState('');

  const registerEmail = useMutation({
    mutationFn: storeEmail(),
    onSuccess: () => console.log("email registered"),
    onError: () => console.log("Email not registered")
  })

  //pending
  const handleSubmit = (e) => {
    e.preventDefault()
    registerEmail.mutate(email)  
    setEmail("")
  }

  return (
    <div className="bg-blue-800 py-10">
        <div className="container mx-auto flex justify-between items-center">
            <span className="text-3xl text-white font-bold tracking-tight">
                MernHolidays.com
            </span>

            <span className="text-white font-bold tracking-tight flex gap-4">
                <p className="cursor-pointer">Privacy Policy</p>
                <p className="cursor-pointer">Terms of Service</p>
            </span>
        </div>

        <div className="flex flex-col items-center container mx-auto space-y-5 mt-5">
          <h1 className="text-white text-3xl font-semibold">
            Stay in the know
          </h1>
          <p className="text-center text-gray-300">
            Sign up to get marketing emails from MernHolidays.com, including promotions, rewards, travel experiences and information about Booking.com’s and Booking.com Transport Limited’s products and services.
          </p>


          <form onSubmit={handleSubmit} className="flex justify-center gap-4">
            <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Your email address" className="px-5 py-1 rounded-md" />
            <button type="submit" className="bg-blue-600 text-white hover:bg-blue-500 px-5 py-2 rounded-lg">
                Subscribe
            </button>
          </form>
        </div>

        <div className="container mx-auto grid grid-cols-2 lg:grid-cols-5 text-gray-400 mt-10">
          {
            footerData.map((row, index) => (
              <div key={index} className="flex flex-col">
                {
                  row.map((data, i) => (
                    <Link key={i} to={"/"} className="hover:text-gray-200 transition-all duration-200">
                      {data}
                    </Link>
                  ))
                }
              </div>
            ))
          }
        </div>
    </div>
  )
}

export default Footer