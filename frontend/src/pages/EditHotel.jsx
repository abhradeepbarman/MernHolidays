import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { fetchMyHotelById, updatedMyHotelById } from "../api-client"
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm"
import { useSelector } from 'react-redux';

function EditHotel() {
    const {hotelId} = useParams()
    const [hotelData, setHotelData] = useState(null)
    const navigate = useNavigate()
    const {token} = useSelector((state) => state.auth)

    useEffect(() => {
      fetchMyHotelById(hotelId, token)
        .then((data) => setHotelData(data))
        .catch((error) => console.log(error))
    }, [hotelId])

    const handleSave = (formData) => {

      updatedMyHotelById(formData, navigate, token)
        .then(() => console.log("updated successfully"))
        .catch((error) => console.log(error))
    }

  return (
    <div>
        <ManageHotelForm hotel={hotelData} onSave={handleSave} />
    </div>
  )
}

export default EditHotel