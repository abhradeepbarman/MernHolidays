const express = require("express")
const cors = require("cors")
require("dotenv").config()
const mongoose = require("mongoose")
const userRoutes = require("./src/routes/users")

mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
    .then(() => console.log("DB connection successful"))
    .catch(() => console.log("DB connection error"))

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))       //helps in parsing url
app.use(cors())

app.use("/api/users", userRoutes)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log("server is running on localhost:", PORT);
})