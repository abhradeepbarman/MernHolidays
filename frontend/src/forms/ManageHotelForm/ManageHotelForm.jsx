import { useForm } from "react-hook-form"
import DetailsSection from "./DetailsSection"
import HotelTypesSection from "./HotelTypesSection"
import FacilitiesSection from "./FacilitiesSection"
import GuestsSection from "./GuestsSection"
import ImagesSection from "./ImagesSection"
import {useSelector} from "react-redux"
import { useEffect } from "react"


const ManageHotelForm = ({onSave, hotel}) => {
    const {isLoading} = useSelector((state) => state.auth)

    const {
        register,
        handleSubmit,
        formState: {errors},
        watch,
        reset,
        setValue,
    } = useForm()

    useEffect(() => {
      reset(hotel)
    }, [hotel, reset])

    

    const onsubmit = (data) => {
      console.log("form data -->",data);
      const formData = new FormData()

      if(hotel) {
        formData.append("hotelId", hotel._id)
      }
      
      formData.append("name", data.name)
      formData.append("city", data.city)
      formData.append("country", data.country)
      formData.append("description", data.description)
      formData.append("type", data.type)
      formData.append("pricePerNight", data.pricePerNight)
      formData.append("starRating", data.starRating)
      formData.append("adultCount", data.adultCount)
      formData.append("childCount", data.childCount)

      data.facilities.forEach((facility, index) => {
        formData.append(`facilities[${index}]`, facility)
      })

      if (data.imageUrls) {
        data.imageUrls.forEach((url, index) => {
          formData.append(`imageUrls[${index}]`, url);
        });
      }

      Array.from(data.imageFiles).forEach((imageFile) => {
        formData.append(`imageFiles`, imageFile)
      })
      
      onSave(formData)
    }

  return (
    <form className="flex flex-col gap-10" onSubmit={handleSubmit(onsubmit)}>
        <DetailsSection register={register} errors={errors} hotel={hotel} />
        <HotelTypesSection register={register} watch={watch} errors={errors} />
        <FacilitiesSection register={register} errors={errors} />
        <GuestsSection register={register} errors={errors} />
        <ImagesSection register={register} errors={errors} watch={watch} setValue={setValue} />

        <span className="flex justify-end">
          <button 
          disabled={isLoading}
          type="submit" 
          className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:bg-gray-500">
            {
              isLoading ? "Saving..." : "Save"
            }
          </button>
        </span>
    </form>
  )
}

export default ManageHotelForm