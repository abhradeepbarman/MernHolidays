import {Link} from "react-router-dom"
import { fetchMyHotels } from "../api-client"
import { useEffect, useState } from "react"
import {BsBuilding, BsMap} from "react-icons/bs"
import {BiHotel, BiMoney, BiStar} from "react-icons/bi"
import { useQuery } from "@tanstack/react-query"

function MyHotels() {

    const [hotels, setHotels] = useState([]);
    const { data } = useQuery({
        queryKey: ["fetchMyHotels", fetchMyHotels],
        queryFn: () => fetchMyHotels()
    });

    useEffect(() => {
        if (data) {
        setHotels(data.hotels);
        }
    }, [data]);
    
    if(!hotels) {
        return <span>No Hotels found</span>
    }

  return (
    <div className="space-y-5">
        <span className="flex justify-between">
            <h1 className="text-3xl font-bold text-blue-600">My Hotels</h1>
            <Link to={"/add-hotel"} className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500 outline-none">
                Add Hotel
            </Link>
        </span> 

        <div className="grid grid-cols-1 gap-8">
            {
                hotels.map((hotel, index) => (
                    <div key={index} className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5">
                        <h2 className="text-2xl font-bold">{hotel.name}</h2>
                        <div className="whitespace-pre-line">{hotel.description}</div>

                        <div className="grid grid-cols-5 gap-2">
                            <div className="border border-slate-300 rounded-sm p-3 flex items-center gap-2">
                                <BsMap className="mr-1" fontSize={28} />
                                {hotel.city}, {hotel.country}
                            </div>

                            <div className="border border-slate-300 rounded-sm p-3 flex items-center gap-2">
                                <BsBuilding className="mr-1"/>
                                {hotel.type}
                            </div>

                            <div className="border border-slate-300 rounded-sm p-3 flex items-center gap-2">
                                <BiMoney className="mr-1" />
                                ₹ {hotel.pricePerNight} per Night
                            </div>

                            <div className="border border-slate-300 rounded-sm p-3 flex items-center gap-2">
                                <BiHotel className="mr-1" fontSize={28} />
                                {hotel.adultCount} adults, {hotel.childCount} children
                            </div>

                            <div className="border border-slate-300 rounded-sm p-3 flex items-center gap-2">
                                <BiStar className="mr-1" />
                                {hotel.starRating} Star Rating 
                            </div>
                        </div>

                        <span className="flex justify-end">
                            <Link to={`/edit-hotel/${hotel._id}`} className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500 outline-none">
                                Edit Details
                            </Link>
                        </span>
                    </div>
                ))
            }   
        </div>
    </div>
  )
}

export default MyHotels