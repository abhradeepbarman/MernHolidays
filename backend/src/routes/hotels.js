const express = require("express")
const router = express.Router()
const { searchHotel, searchHotelbyId } = require("../controllers/Hotel")
const {param} = require("express-validator")
const {verifyToken} = require("../middleware/auth")
const {createPaymentIntent, createHotelBooking} = require("../controllers/Hotel")
const { getLatestHotels } = require("../controllers/Hotel")

router.get("/search", searchHotel)
router.get("/:id", searchHotelbyId)
router.post("/:hotelId/bookings/payment-intent", verifyToken, createPaymentIntent)
router.post("/:hotelId/bookings", verifyToken, createHotelBooking)
router.get("/", getLatestHotels)

module.exports = router