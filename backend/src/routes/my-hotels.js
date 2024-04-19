const express = require("express")
const router = express.Router()
const { addHotel, getAllHotels, getHotelDetails, uploadImages, updateHotel } = require("../controllers/MyHotel")
const { verifyToken } = require("../middleware/auth")


const multer = require("multer")
const storage = multer.memoryStorage()
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5*1024*1024, //5MB
    }
})

router.post("/addHotel", upload.array("imageFiles", 6), verifyToken , addHotel)
router.get("/", verifyToken, getAllHotels)
router.get("/:id", verifyToken, getHotelDetails)
router.put("/:hotelId", verifyToken, updateHotel)

module.exports = router