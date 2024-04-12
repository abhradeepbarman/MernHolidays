const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        requied: true,
    },
    firstName: {
        type: String,
        requied: true,
    },
    lastName: {
        type: String,
        requied: true,
    }
})

module.exports = mongoose.model("User", UserSchema)