const express = require("express")
const { addHotel, getAllHotels } = require("../controllers/Hotel")
const { verifyToken } = require("../middleware/auth")
const { body } = require("express-validator")
const router = express.Router()

const multer = require("multer")
const storage = multer.memoryStorage()
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5 MB
    }
})

// api/my-hotels
router.post("/", upload.array("imageFiles", 6), verifyToken, [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("description is required"),
    body("type").notEmpty().withMessage("Hotel Type is required"),
    body("pricePerNight")
        .notEmpty()
        .isNumeric()
        .withMessage("Price per night is required & it should be a Number"),
    body("facilities")
        .notEmpty()
        .isArray()
        .withMessage("Hotel Facilities is required"),
], addHotel)

router.get("/", verifyToken, getAllHotels)

module.exports = router