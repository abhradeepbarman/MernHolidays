import { createPaymentIntent, fetchCurrentUser, fetchHotelById } from "../api-client"
import { useQuery } from '@tanstack/react-query';
import BookingForm from "../forms/BookingForm/BookingForm";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BookingDetailSummary from "../components/BookingDetailSummary";
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js";
import { ArrowLeft } from 'lucide-react'

// Payment -------------------------------------------
const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY || ""
const stripePromise = loadStripe(STRIPE_PUB_KEY)
// ------------------------------------------------------

function Booking() {

  const search = useSelector((state) => state.search)
    const {hotelId} = useParams()
    const navigate = useNavigate()

    const [numberOfNights, setNumberOfNights] = useState(0)

    useEffect(() => {
      if(search.checkIn && search.checkOut) {
        const nights = Math.abs(new Date(search.checkOut).getTime() - new Date(search.checkIn).getTime()) / (1000 * 60 * 60 * 24)
        
        setNumberOfNights(Math.ceil(nights))
      } 

    }, [search.checkIn, search.checkOut])

    const {data: paymentIntentData} = useQuery({
      queryKey: ["createPaymentIntent", hotelId, numberOfNights],
      queryFn: () =>   createPaymentIntent(hotelId, numberOfNights.toString()), 
      enabled: !!hotelId && numberOfNights > 0
    });

    
    const { data: hotel } = useQuery({
      queryKey: ["fetchHotelById", hotelId],
      queryFn: () => fetchHotelById(hotelId),
      enabled: !!hotelId,
    });

    
    const { data: currentUser } = useQuery({
      queryKey: ["currentUser"],
      queryFn: fetchCurrentUser,
    });

    if(!hotel) {
      return <div>
        No Hotel
      </div>
    }

  return (
    <div className="grid md:grid-cols-[1fr_2fr]">
      <BookingDetailSummary 
          checkIn={new Date(search.checkIn)} 
          checkOut={new Date(search.checkOut)} 
          adultCount={search.adultCount} 
          childCount={search.childCount} 
          numberOfNights={numberOfNights}
          hotel={hotel}
      />
      {
        numberOfNights === 0 && (
          <div className="text-4xl text-center mt-10 p-5 font-semibold space-y-8">
            <div>
              Please add the hotel for atleast 1 Night. 
              <span className="text-[#8576FF]"> Thanks!</span>
            </div>

            <button
              type="button"
              className="inline-flex items-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white hover:bg-black/80"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </button>
          </div>
        )
      }
      {
        currentUser && paymentIntentData && (
            <Elements stripe={stripePromise} options={{
              clientSecret: paymentIntentData.clientSecret
            }}>
              <BookingForm currentUser={currentUser} paymentIntent={paymentIntentData} />
            </Elements>
        )  
      }
    </div>
  )
}

export default Booking