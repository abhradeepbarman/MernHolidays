const express = require("express")
const router = express.Router()
const { searchHotel, searchHotelbyId } = require("../controllers/Hotel")
const {param} = require("express-validator")


router.get("/search", searchHotel)
router.get("/:id", searchHotelbyId)

module.exports = router