const express = require("express")
const { getMyBookings } = require('./../controllers/MyBookings')
const router = express.Router()
const { verifyToken } = require("../middleware/auth")

router.get("/", verifyToken, getMyBookings)

module.exports = router