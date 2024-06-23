import { addMyHotel } from "../api-client";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm"
import { useMutation } from '@tanstack/react-query';
import toast from "react-hot-toast";


function AddHotel() {

  const { mutate, isPending } = useMutation({
    mutationFn: addMyHotel,
    onSuccess: () => toast.success("Hotel added"),
    onError: (err) => {
      toast.error(err.message)
      toast.dismiss()
    } 
  })

  const handleSave = (formData) => {
    mutate(formData);
  }

  return (
    <ManageHotelForm onSave={handleSave} isPending={isPending} />
  )
}

export default AddHotel