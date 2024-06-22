const Hotel = require("../models/Hotel");
const { uploadImages } = require("../util/uploadImages");

exports.addHotel = async(req, res) => {
    const {name, city, country, description, type, pricePerNight, facilities, starRating, adultCount, childCount} = req.body;
    const imageFiles = req.files;

    if(!name || !city || ! country || !description || !type || !pricePerNight  || !facilities || !starRating || !adultCount || !childCount) {
        return res.status(400).json({
            success: false,
            message: "All fields are required",
        })
    }

    if(req.files.length == 0) {
        return res.status(400).json({
            success: false,
            message: "Atleast 1 image is required",
        })
    }

    try {
        const newHotel = req.body;

        //upload the images to cloudinary
        const imageUrls = await uploadImages(imageFiles);
        newHotel.imageUrls = imageUrls;
        newHotel.lastUpdated = new Date()
        newHotel.userId = req.userId;
        newHotel.acceptBooking = true


        //save the new Hotel in our DB
        const hotel = new Hotel(newHotel)
        await hotel.save()

        //return success status
        return res.status(200).json({
            success: true,
            message: "Hotel added successfully",
            hotel
        })
    } 
    catch (error) {
        console.log("Error creating Hotel");
        console.log(error.message);  
        return res.status(500).json({
            success: false,
            message: "Error while adding Hotel"
        })  
    } 
}

exports.getMyHotels = async(req, res) => {
    try {
        const hotels = await Hotel.find({
            userId: req.userId
        })
        
        res.send(hotels)
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching hotels"
        })
    }
}

exports.getHotelDetails = async(req, res) => {
    const {hotelId} = req.params

    try {
        const hotel = await Hotel.findOne({
            _id: hotelId,
            userId: req.userId,
        })

        res.send(hotel);
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        })
    }
}

exports.updateHotel = async(req, res) => {
    const {hotelId} = req.params;

    try {
        const updatedHotel = req.body
        updatedHotel.lastUpdated = new Date()

        const hotel = await Hotel.findOneAndUpdate({
            _id: hotelId,
            userId: req.userId,
        }, 
        updatedHotel, 
        { new: true})


        if(!hotel) {
            return res.status(404).json({
                success: false,
                message: "Hotel not found"
            })
        }

        const files = req.files
        const updatedImageUrls = await uploadImages(files)

        hotel.imageUrls = [
            ...updatedImageUrls, 
            ...(updatedHotel.imageUrls || [])
        ]

        await hotel.save()
        return res.status(201).json(hotel)
    } 
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong!"
        })
    }
}

exports.acceptBooking = async(req, res) => {
    const {hotelId} = req.body;

    try {
        //find hotel
        const hotel = await Hotel.findById(hotelId)

        if(!hotel) {
            return res.status(404).json({
                success: false,
                message: "Hotel not Found",
            })
        }

        //update accept booking
        if(hotel.acceptBooking === true) {
            hotel.acceptBooking = false
        }
        else {
            hotel.acceptBooking = true;
        }
        await hotel.save()

        //return response
        return res.status(200).json({
            success: false,
            message: "Hotel accept booking status changed successfully",
        })
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        })
    }
}

exports.deleteHotel = async(req, res) => {
    const {hotelId} = req.body;

    try {
        const hotel = Hotel.findById(hotelId);

        if(!hotel) {
            return res.status(404).json({
                success: false,
                message: "Hotel not found",
            })
        }

        //delete hotel
        await Hotel.findByIdAndDelete(hotelId)

        return res.status(200).json({
            success: true,
            message: "Hotel deleted successfully",
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        })
    }
}