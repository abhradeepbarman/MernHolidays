import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm"
import { addMyHotel } from "../api-client";

function AddHotel() {
  const handleSave = (formData) => {
    console.log("inside handle save", formData);
    addMyHotel(formData);
  }

  return (
    <ManageHotelForm onSave={handleSave} />
  )
}

export default AddHotel