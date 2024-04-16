import { useState } from "react"
import {useDispatch, useSelector} from "react-redux"
import { setSearchValues } from "../Store/slices/SearchSlice"
import {MdTravelExplore} from "react-icons/md"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom"

function SearchBar() {

    const search = useSelector((state) => state.search)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    
    const [destination, setDestination] = useState(search.destination)
    const [checkIn, setCheckIn] = useState(search?.checkIn)
    const [checkOut, setCheckOut] = useState(search?.checkOut)
    const [adultCount, setAdultCount] = useState(search.adultCount)
    const [childCount, setChildCount] = useState(search.childCount)

    const handleSubmit = (event) => {   
        event.preventDefault()

        console.log(destination, checkIn, checkOut, adultCount, childCount);

        dispatch(setSearchValues({
            destination, 
            checkIn: checkIn.toISOString(), 
            checkOut: checkOut.toISOString(), 
            adultCount, 
            childCount
        }))

        navigate("/search")
    }

    const minDate = new Date()
    const maxDate = new Date()
    maxDate.setFullYear(maxDate.getFullYear() + 1)

  return (
    <form onSubmit={handleSubmit} className="-mt-8 p-3 bg-orange-400 rounded shadow-md grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 items-center gap-4">
        
        <div className="flex flex-row items-center flex-1 bg-white p-2">
            <MdTravelExplore size={25} className="mr-2" />
            <input placeholder="Where are you going?" 
                className="text-md w-full focus:outline-none" 
                value={destination} 
                onChange={(event) => setDestination(event.target.value)} 
            />
        </div>

        <div className="flex bg-white px-2 py-1 gap-2">
            <label className="flex items-center">
                Adults:
                <input className="w-full p-1 focus:outline-none font-bold" type="number" min={1} max={20} value={adultCount} onChange={(event) => setAdultCount(parseInt(event.target.value))} />
            </label>

            <label className="flex items-center">
                Children:
                <input className="w-full p-1 focus:outline-none font-bold" type="number" min={0} max={20} value={childCount} onChange={(event) => setChildCount(parseInt(event.target.value))} />
            </label>
        </div>

        <div>
            <DatePicker
            selected={checkIn}
            onChange={(date) => setCheckIn(date)}
            selectsStart
            startDate={checkIn}
            endDate={checkOut}
            minDate={minDate}
            maxDate={maxDate}
            dateFormat="dd-MM-yyyy"
            placeholderText="Check-in Date"
            className="min-w-full bg-white p-2 focus:outline-none "
            wrapperClassName="min-w-full"
            />
        </div>
        
        <div>
            <DatePicker
            selected={checkOut}
            onChange={(date) => setCheckOut(date)}
            selectsStart
            startDate={checkIn}
            endDate={checkOut}
            minDate={checkIn}
            maxDate={maxDate}
            dateFormat="dd-MM-yyyy"
            placeholderText="Check-out Date"
            className="min-w-full bg-white p-2 focus:outline-none"
            wrapperClassName="min-w-full"
            />
        </div>

        <div className="flex gap-1">
            <button type="submit" className="w-2/3 bg-blue-600 text-white h-full p-2 font-bold text-xl hover:bg-blue-500">
                Search
            </button>

            <button className="w-1/3 bg-red-600 text-white h-full p-2 font-bold text-xl hover:bg-red-500">
                Clear
            </button>
        </div>
    </form>
  )
}

export default SearchBar