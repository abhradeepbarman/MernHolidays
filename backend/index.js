const express = require("express")
const cors = require("cors")
require("dotenv").config()
const mongoose = require("mongoose")
const userRoutes = require("./src/routes/users")
const authRoutes = require("./src/routes/auth")
const cookieParser = require("cookie-parser")
const path = require("path")
const cloudinary = require('cloudinary').v2;
const myHotelRoutes = require("./src/routes/my-hotels")
const hotelRoutes = require("./src/routes/hotels")
const bookingRoutes = require("./src/routes/my-bookings")

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
    .then(() => console.log("DB connection successful"))
    .catch(() => console.log("DB connection error"))



const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}));  //helps in parsing form-data
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}))
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/my-hotels", myHotelRoutes)
app.use("/api/users", userRoutes)
app.use("/api/hotels", hotelRoutes)
app.use("/api/my-bookings", bookingRoutes)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log("server is running on localhost:", PORT);
})