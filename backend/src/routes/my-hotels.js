const express = require("express")
const router = express.Router()
const { addHotel, getHotelDetails, updateHotel, getMyHotels, acceptBooking, deleteHotel } = require("../controllers/MyHotel")
const { verifyToken } = require("../middleware/auth")
const multer = require("multer")


// this middleware is required for stopping users from uploading more than 5 MB files
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5*1024*1024, //5MB
    }
})


router.post("/addHotel", upload.array("imageFiles", 6), verifyToken , addHotel)
router.get("/getMyHotels", verifyToken, getMyHotels)
router.get("/:hotelId", verifyToken, getHotelDetails)
router.put("/edit/:hotelId", upload.array("imageFiles"), verifyToken, updateHotel)
router.put("/acceptBooking", verifyToken, acceptBooking)
router.delete("/deleteHotel", verifyToken, deleteHotel)

module.exports = router