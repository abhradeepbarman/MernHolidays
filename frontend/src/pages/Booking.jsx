import { fetchCurrentUser } from "../api-client"
import { useQuery } from '@tanstack/react-query';

function Booking() {

    const { data: currentUser } = useQuery({
        queryKey: "currentUser", 
        queryFn: fetchCurrentUser()
    })

    console.log(currentUser);

  return (
    <div>

    </div>
  )
}

export default Booking