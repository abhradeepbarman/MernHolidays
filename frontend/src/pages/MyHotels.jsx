import { Link } from "react-router-dom";
import { changeAcceptBooking, deleteHotelById, fetchMyHotels } from "../api-client";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { RiDeleteBinLine } from "react-icons/ri";
import { useState } from "react";

function MyHotels() {

  const [showConfirmationModal, setShowConfirmationModal] = useState(null)

  const { data: hotels, isError, refetch } = useQuery({
    queryKey: ["fetchMyHotels"],
    queryFn: fetchMyHotels,
  });

  const handleAcceptBookingChange = async(hotelId) => {
    await changeAcceptBooking(hotelId)
    refetch()
  }

  const deleteHotel = async(hotelId) => {
    await deleteHotelById(hotelId)
    setShowConfirmationModal(null)
    refetch()
  }

  if (isError) {
    toast.error("Error");
  }

  return (
    <div className="space-y-5">

      {/* Heading  */}
      <span className="flex justify-between">
        <h1 className="text-3xl font-bold text-blue-600">My Hotels</h1>
        <Link
          to={"/add-hotel"}
          className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500 outline-none"
        >
          Add Hotel
        </Link>
      </span>

      {/* Hotel Cards  */}
      <div className="grid grid-cols-1 gap-8">
        {
          hotels && hotels.length === 0 && (
            <div className="font-bold text-3xl mt-7 mx-auto">Add your First Hotel</div>
          )
        }
        
        {
          hotels && hotels.length > 0 && hotels.map((hotel, index) => (
          <div
            key={index}
            className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5"
          >
            <div className="flex justify-between">
              <h2 className="text-2xl font-bold">{hotel.name}</h2>

              {/* Accept Booking button  */}
              <label className="inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  value="" 
                  className="sr-only peer" 
                  checked={hotel.acceptBooking} 
                  onChange={() => handleAcceptBookingChange(hotel._id)}
                />
                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-400">Accepting Bookings</span>
              </label>
            </div>

            <div className="whitespace-pre-line">
              {hotel.description.split(" ").length > 70
                ? `${hotel.description.split(" ").slice(0, 70).join(" ")}...`
                : hotel.description}
            </div>

            <div className="grid grid-cols-5 gap-2">
              <div className="border border-slate-300 rounded-sm p-3 flex items-center gap-2">
                <BsMap className="mr-1" />
                {hotel.city}, {hotel.country}
              </div>

              <div className="border border-slate-300 rounded-sm p-3 flex items-center gap-2">
                <BsBuilding className="mr-1" />
                {hotel.type}
              </div>

              <div className="border border-slate-300 rounded-sm p-3 flex items-center gap-2">
                <BiMoney className="mr-1" />₹ {hotel.pricePerNight} per Night
              </div>

              <div className="border border-slate-300 rounded-sm p-3 flex items-center gap-5">
                <BiHotel className="mr-1" fontSize={24} />
                {hotel.adultCount} adults, <br /> {hotel.childCount} children
              </div>

              <div className="border border-slate-300 rounded-sm p-3 flex items-center gap-2">
                <BiStar className="mr-1" />
                {hotel.starRating} Star Rating
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div>
              <button type="button" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-md border border-transparent bg-red-100 text-red-500 hover:bg-red-200 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-red-00 dark:text-red-500 dark:hover:text-red-400"
              onClick={() => setShowConfirmationModal(hotel._id)}
              >
                <RiDeleteBinLine />
                Delete
              </button>
              </div>

              <span>
                <Link
                  to={`/edit-hotel/${hotel._id}`}
                  className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500 outline-none"
                >
                  Edit Details
                </Link>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* confirmation modal */}
      <div
        className={`${showConfirmationModal ? "flex" : "hidden"} fixed inset-0 p-4 flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]`}>
        <div className="w-full max-w-md bg-white shadow-lg rounded-md p-6 relative">
          
          {/* cross button  */}
          <svg xmlns="http://www.w3.org/2000/svg"
            className="w-3.5 cursor-pointer shrink-0 fill-black hover:fill-red-500 float-right" viewBox="0 0 320.591 320.591"
            onClick={() => setShowConfirmationModal(null)}
            >
            <path
              d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
              data-original="#000000"></path>
            <path
              d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
              data-original="#000000"></path>
          </svg>

          <div className="my-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-16 fill-red-500 inline" viewBox="0 0 24 24">
              <path
                d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                data-original="#000000" />
              <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                data-original="#000000" />
            </svg>
            <h4 className="text-xl font-semibold mt-6">
              Are you sure you want to delete it?
            </h4>
            <p className="text-sm text-gray-500 mt-4">
              All data related to this Hotel will get deleted!
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <button type="button"
              className="px-6 py-2.5 rounded-md text-white text-sm font-semibold border-none outline-none bg-red-500 hover:bg-red-600 active:bg-red-500"
                onClick={() => deleteHotel(showConfirmationModal)}
              >
                Delete
              </button>
            <button type="button"
              className="px-6 py-2.5 rounded-md text-black text-sm font-semibold border-none outline-none bg-gray-200 hover:bg-gray-300 active:bg-gray-200"
              onClick={() => setShowConfirmationModal(null)}
              >
                Cancel
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

export default MyHotels;
