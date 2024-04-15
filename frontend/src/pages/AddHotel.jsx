import { useDispatch } from "react-redux";
import { addMyHotel } from "../api-client";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm"


function AddHotel() {
  const dispatch = useDispatch();

  const handleSave = (formData) => {
    console.log("inside handle save", formData);
    addMyHotel(formData, dispatch);
  }

  return (
    <ManageHotelForm onSave={handleSave} />
  )
}

export default AddHotel