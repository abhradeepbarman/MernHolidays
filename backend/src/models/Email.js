const mongoose = require("mongoose")

const emailSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    submittedAt: {
        type: Date,
        required: true,
    }
})

module.exports = mongoose.model("email", emailSchema)