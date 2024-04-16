const Hotel = require("../models/Hotel")

exports.searchHotel = async(req, res) => {
   try {
        const pageSize = 5;
        const pageNumber = parseInt(req.query.page ? req.query.page.toString() : "1")
        const skip = (pageNumber - 1) * pageSize;

        const hotels = await Hotel.find().skip(skip).limit(pageSize)

        const total = await Hotel.countDocuments()

        const response = {
            data: hotels,
            pagination: {
                total,
                page: pageNumber,
                pages: Math.ceil(total/pageSize)
            }
        }

        res.json(response)
   } 
   catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
   } 
}