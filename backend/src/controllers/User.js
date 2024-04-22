const emailModel = require("../models/Email");
const User = require("../models/User");

exports.storeEmail = async(req, res) => {
    const {email} = req.body;

    if(!email) {
        console.log("Email is required!");
        return res.status(400).json({
            success: false,
            message: "Email id is required",
        })
    }

    try {
        //check if email already submitted
        const alreadySubmitted = await emailModel.findOne({email})

        if(alreadySubmitted) {
            console.log("Already Submitted");
            return res.status(400).json({
                success: false,
                message: "Email is already registered!",
            })
        }

        await emailModel.create({email: email, submittedAt: new Date()})
        return res.status(200).json({
            success: true,
            message: "Email Registered!"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server error",
        })
    }
}

exports.getCurrentUser = async(req, res) => {
    const userId = req.userId;

    try {
        const user = await User.findById(userId).select("-password")
        if(!user) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            })
        }

        return res.json(user)
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server error",
        })
    }
}