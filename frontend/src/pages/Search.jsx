import { useSelector } from "react-redux"
import { searchHotels } from "../api-client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query"
import SearchResultCard from "../components/SearchResultCard";

function Search() {

    const search = useSelector((state) => state.search)
    const [page, setPage] = useState(1)
    
    const searchParams = {
      destination: search.destination,
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      adultCount: search.adultCount.toString(),
      childCount: search.childCount.toString(),
      page: page.toString(),
    };
    
    const { data } = useQuery({ queryKey: ["searchHotels", searchParams], queryFn: () => searchHotels(searchParams) });
    
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
              Filter by:
          </h3>
          {/* TODO: FILTERS  */}
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">
            {data?.pagination.total} Hotels found
            {search.destination ? `in ${search.destination}` : ""}
          </span>

          {/* SORT OPTIONS  */}
        </div>

        {
          data?.data.map((hotel, index) => (
            <SearchResultCard hotel={hotel} key={index} />
          ))
        }
      </div>

    </div>
  )
}

export default Search