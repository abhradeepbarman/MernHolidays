import { useSelector } from "react-redux"
import { searchHotels } from "../api-client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query"
import SearchResultCard from "../components/SearchResultCard";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";
import HotelTypesFilter from "../components/HotelTypesFilter";
import FacilitiesFilter from "../components/FacilitiesFilter";
import PriceFilter from "../components/PriceFilter";

function Search() {

    const search = useSelector((state) => state.search)
    const [page, setPage] = useState(1)
    const [selectedStars, setSelectedStars] = useState([])
    const [selectedHotelTypes, setSelectedHotelTypes] = useState([])
    const [selectedFacilities, setSelectedFacilities] = useState([])
    const [selectedPrice, setSelectedPrice] = useState();
    const [sortOptions, setSortOptions] = useState("")

    const handleStarsChange = (event) => {
      const starRating = event.target.value;

      setSelectedStars((prevStars) =>
        event.target.checked 
        ? [...prevStars, starRating]
        : prevStars.filter((star) => star !== starRating)
      )
    }

    const handleHotelTypeChange = (event) => {
      const hotelType = event.target.value;

      setSelectedHotelTypes((prevType) =>
        event.target.checked 
        ? [...prevType, hotelType]
        : prevType.filter((type) => type !== hotelType)
      )
    }

    const handleFacilitiesChange = (event) => {
      const facility = event.target.value;

      setSelectedFacilities((prevFacilities) =>
        event.target.checked 
        ? [...prevFacilities, facility]
        : prevFacilities.filter((item) => item !== facility)
      )
    }
    
    const searchParams = {
      destination: search.destination,
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      adultCount: search.adultCount.toString(),
      childCount: search.childCount.toString(),
      page: page.toString(),
      stars: selectedStars,
      types: selectedHotelTypes,
      facilities: selectedFacilities,
      maxPrice: selectedPrice?.toString(),
      sortOptions,
    };
    
    const { data } = useQuery({ queryKey: ["searchHotels", searchParams], queryFn: () => searchHotels(searchParams) });

    console.log(data);
    
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
              Filter by:
          </h3>

          {/* TODO: FILTERS  */}
          <StarRatingFilter selectedStars={selectedStars} onChange={handleStarsChange} />
          <HotelTypesFilter selectedHotelTypes={selectedHotelTypes} onChange={handleHotelTypeChange} />
          <FacilitiesFilter selectedFacilities={selectedFacilities} onChange={handleFacilitiesChange} />
          <PriceFilter
            selectedPrice={selectedPrice}
            onChange={(value) => setSelectedPrice(value)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">
            {data?.pagination.total} Hotels found
            {search.destination ? ` in ${search.destination}` : ""}
          </span>

          {/* SORT OPTIONS  */}
          <select value={sortOptions} onChange={(event) => setSortOptions(event.target.value)} className="p-2 border rounded-md">
            <option value={""}>Sort by</option>
            <option value={"starRating"}>Star Rating</option>
            <option value={"pricePerNightAsc"}>Price per Night (low to high)</option>
            <option value={"pricePerNightDesc"}>Price per Night (high to low)</option>
          </select>
        </div>

        {
          data?.data.map((hotel, index) => (
            <SearchResultCard hotel={hotel} key={index} />
          ))
        }

        <div>
          <Pagination page={data?.pagination.page} 
                      pages={data?.pagination.pages} 
                        onPageChange={(page) => setPage(page)}
          />
        </div>
      </div>      
    </div>
  )
}

export default Search