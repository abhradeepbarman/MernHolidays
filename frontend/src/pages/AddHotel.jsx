import { addMyHotel } from "../api-client";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm"
import { useMutation } from '@tanstack/react-query';
import toast from "react-hot-toast";
import { useSelector } from 'react-redux';


function AddHotel() {
  const {token} = useSelector((state) => state.auth)

  const { mutate, isPending } = useMutation({
    mutationFn: (formData) => addMyHotel(formData, token),
    onSuccess: () => toast.success("Hotel added"),
    onError: (err) => {
      toast.error(err.message)
      toast.dismiss()
    } 
  })

  const handleSave = (formData) => {
    mutate(formData, token);
  }

  return (
    <ManageHotelForm onSave={handleSave} isPending={isPending} />
  )
}

export default AddHotel