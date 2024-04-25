import { Link } from "react-router-dom";
import { fetchMyHotels } from "../api-client";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

function MyHotels() {
  const { data: hotels, isError } = useQuery({
    queryKey: ["fetchMyHotels"],
    queryFn: fetchMyHotels,
  });

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
            <h2 className="text-2xl font-bold">{hotel.name}</h2>

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
