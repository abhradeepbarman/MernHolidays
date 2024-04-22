import { fetchCurrentUser, fetchHotelById } from "../api-client"
import { useQuery } from '@tanstack/react-query';
import BookingForm from "../forms/BookingForm/BookingForm";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BookingDetailSummary from "../components/BookingDetailSummary";

function Booking() {

  const search = useSelector((state) => state.search)
    const {hotelId} = useParams()

    const [numberOfNights, setNumberOfNights] = useState(0)

    useEffect(() => {
      if(search.checkIn && search.checkOut) {
        const nights = Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) / (1000 * 60 * 60 * 24)
        
        setNumberOfNights(Math.ceil(nights))
      } 

    }, [search.checkIn, search.checkOut])

    const {data: hotel} = useQuery({
      queryKey: ["fetchHotelById"],
      queryFn: () => fetchHotelById(hotelId)
    })

    const { data: currentUser } = useQuery({
        queryKey: ["currentUser"], 
        queryFn: fetchCurrentUser,
    })

    if(!hotel) {
      return <div>
        No Hotel
      </div>
    }

  return (
    <div className="grid md:grid-cols-[1fr_2fr]">
      <BookingDetailSummary 
          checkIn={search.checkIn} 
          checkOut={search.checkOut} 
          adultCount={search.adultCount} 
          childCount={search.childCount} 
          numberOfNights={numberOfNights}
          hotel={hotel}
      />
      {
        currentUser && <BookingForm currentUser={currentUser} />
      }
    </div>
  )
}

export default Booking