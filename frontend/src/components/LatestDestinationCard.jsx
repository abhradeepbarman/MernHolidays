import { Link } from "react-router-dom"

function LatestDestinationCard({hotel}) {
  return (
    <Link to={`/detail/${hotel._id}`} className="relative cursor-pointer overflow-hidden rounded-md">

        <div className="h-[300px] overflow-hidden">
            <img src={hotel.imageUrls[0]} className="w-full h-full object-cover object-center transition-transform transform-gpu hover:scale-105 shadow-md" />
        </div>

        <div className="absolute bottom-0 p-4 bg-black bg-opacity-50 w-full rounded-b-md">
            <span className="text-white font-bold tracking-tighter text-3xl">
                {hotel.name}
            </span>
        </div>
    </Link>
  )
}

export default LatestDestinationCard