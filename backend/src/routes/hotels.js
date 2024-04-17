const express = require("express")
const router = express.Router()
const { searchHotel, searchHotelbyId } = require("../controllers/SearchHotel")
const {param} = require("express-validator")

// /api/hotels/search
router.get("/search", searchHotel)

router.get("/:id", [
    param("id").notEmpty().withMessage("Hotel id is required")
], searchHotelbyId)

module.exports = router