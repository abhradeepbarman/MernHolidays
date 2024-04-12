const User = require("../models/User")
const bcrypt = require("bcrypt")
const { validationResult } = require("express-validator")
const jwt = require("jsonwebtoken")

exports.register = async(req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: errors.array(),
            })
        }

        const {email, password, firstName, lastName} = req.body

        //check user exists or not
        let user = await User.findOne({email: email})
        
        //user already registered, do not need to register
        if(user) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }

        //encrypt the password 
        const hashedPassword = await bcrypt.hash(password, 10)

        //now save the data
        const newUser = await User.create({
            email,
            password: hashedPassword,
            firstName,
            lastName
        })

        //create token
        const payload = {
            userId: newUser._id
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
            expiresIn: "1d"
        })

        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000,
        })        

        return res.sendStatus(200)
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        })
    }
}   