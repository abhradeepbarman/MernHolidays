import {useParams} from "react-router-dom"
import {useQuery} from "@tanstack/react-query"
import { fetchHotelById } from "../api-client"
import {AiFillStar} from "react-icons/ai"
import GuestInfoForm from "../forms/GuestInfoForm/GuestInfoForm"
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

function Details() {
    const { hotelId } = useParams()    
    
    const {data} = useQuery({
        queryKey: ["fetchHotelById"], 
        queryFn: () => fetchHotelById(hotelId) 
    })

    if(!data) {
        return <></>
    }

  return (
    <div className="space-y-6">
        
        <div className="space-y-2">
            <div className="flex gap-2 items-center">
                <span className="flex">
                    {
                        Array.from({ length: data?.starRating }).map((index) => (
                            <AiFillStar className="fill-yellow-400" key={index} />
                        ))
                    }

                </span>

                <span className="font-semibold">( {data?.type} )</span>
            </div>
            
            <div>
                <h1 className="text-3xl font-bold">{data.name}</h1>
                <span>{data?.city}, {data?.country}</span>
            </div>
        </div>
        
        <PhotoProvider>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {
                    data.imageUrls.map((image) => (
                        <PhotoView key={image} src={image}>
                            <img 
                                src={image} 
                                alt={data.name} 
                                className="rounded-md w-full h-full object-cover object-center" 
                            />  
                        </PhotoView>
                    ))
                }
            </div>
        </PhotoProvider>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
            {
                data.facilities.map((facility, index) => (
                    <div key={index} className="border border-slate-300 rounded-sm p-3">
                        {facility}
                    </div>
                ))
            }
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10">
            <div className="whitespace-pre-line text-justify">
                {data.description}
            </div>

            <div className="h-fit">
                <GuestInfoForm hotelId={hotelId} pricePerNight={data?.pricePerNight} user={data?.userId} />
            </div>
        </div>
    </div>
  )
}

export default Details