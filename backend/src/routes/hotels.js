const express = require("express")
const router = express.Router()
const { searchHotel } = require("../controllers/SearchHotel")

// /api/hotels/search
router.get("/search", searchHotel)

module.exports = router