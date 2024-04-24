const Hotel = require("../models/Hotel")

exports.getMyBookings = async(req, res) => {
    try {
        const userId = req.userId

        //find hotels booked by the logged-in user
        const hotels = await Hotel.find({
            bookings: { 
                $elemMatch: {
                    userId: userId,
                }
            }
        })   
        
        const results = hotels.map((hotel) => {
            const userBookings = hotel.bookings.filter((booking) => booking.userId === userId)

            const hotelWithUserBookings = {
                ...hotel.toObject(),
                bookings: userBookings
            }

            return hotelWithUserBookings;
        })

        res.status(200).send(results)
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}