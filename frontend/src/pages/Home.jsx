import { fetchHotels } from "../api-client"
import { useQuery } from '@tanstack/react-query';
import LatestDestinationCard from "../components/LatestDestinationCard";

function Home() {
    const {data: hotels} = useQuery({
        queryKey: ["fetchHotels"],
        queryFn: fetchHotels,
    })

    const topRowHotels = hotels?.slice(0,2) || []
    const bottomRowHotels = hotels?.slice(2) || []

  return (
    <div className="space-y-3">
        <h2 className="text-3xl font-bold">Latest Destinations</h2>
        <p>Most recent destinations added by our hosts</p>

        <div className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {
                    topRowHotels.map((hotel, i) => (
                        <div key={i}>
                            <LatestDestinationCard hotel={hotel} />
                        </div>
                    ))
                }
            </div>

            <div className="grid md:grid-cols-3 gap-4">
                {
                    bottomRowHotels.map((hotel, i) => (
                        <div key={i}>
                            <LatestDestinationCard hotel={hotel} />
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default Home