import { Link } from "react-router-dom";
import { changeAcceptBooking, fetchMyHotels } from "../api-client";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

function MyHotels() {

  const { data: hotels, isError, refetch } = useQuery({
    queryKey: ["fetchMyHotels"],
    queryFn: fetchMyHotels,
  });

  const handleAcceptBookingChange = async(hotelId) => {
    await changeAcceptBooking(hotelId)
    refetch()
  }

  if (isError) {
    toast.error("Error");
  }

  if (!hotels) {
    return <span>No Hotels found</span>;
  }

  return (
    <div className="space-y-5">
      <span className="flex justify-between">
        <h1 className="text-3xl font-bold text-blue-600">My Hotels</h1>
        <Link
          to={"/add-hotel"}
          className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500 outline-none"
        >
          Add Hotel
        </Link>
      </span>

      <div className="grid grid-cols-1 gap-8">
        {hotels.length === 0 && (
            <div className="font-bold text-3xl mt-7 mx-auto">Add your First Hotel</div>
        )}
        {hotels.map((hotel, index) => (
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

            <span className="flex justify-end">
              <Link
                to={`/edit-hotel/${hotel._id}`}
                className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500 outline-none"
              >
                Edit Details
              </Link>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyHotels;
