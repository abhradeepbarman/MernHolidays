const {validationResult} = require("express-validator")
const Hotel = require("../models/Hotel")
const cloudinary = require('cloudinary').v2;


exports.addHotel = async(req, res) => {
    
    //validation
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: errors.array()
        })
    }

    try {
        const imageFiles = req.files;
        const newHotel = req.body;


        //upload the images to cloudinary
        const uploadPromises = imageFiles.map(async(image) => {
            const b64 = Buffer.from(image.buffer).toString("base64")
            let dataURI = "data:" + image.mimetype + ";base64," + b64;
            const response = await cloudinary.uploader.upload(dataURI);
            return response.url;
        })

        //if upload is successful, add the URLs to the new Hotel
        const imageUrls = await Promise.all(uploadPromises);
        newHotel.imageUrls = imageUrls;
        newHotel.lastUpdated = new Date()
        newHotel.userId = req.userId;

        //save the new Hotel in our DB
        const hotel = new Hotel(newHotel)
        await hotel.save()

        console.log("hotel added");

        //return success status
        return res.status(200).json({
            success: true,
            message: "Hotel added successfully",
            hotel
        })
    } 
    catch (error) {
        console.log("Error creating Hotel");
        console.log(error);  
        return res.status(500).json({
            success: false,
            message: "Error while adding Hotel"
        })  
    } 
}