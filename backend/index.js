const express = require("express")
const cors = require("cors")
require("dotenv").config()
const mongoose = require("mongoose")
const userRoutes = require("./src/routes/users")
const authRoutes = require("./src/routes/auth")
const cookieParser = require("cookie-parser")
const path = require("path")

mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
    .then(() => console.log("DB connection successful"))
    .catch(() => console.log("DB connection error"))



const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))       //helps in parsing url
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}))
app.use(cookieParser())

app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log("server is running on localhost:", PORT);
})