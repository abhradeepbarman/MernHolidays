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

        return res.status(200).send({ 
            success: true,
            message: "User registered",
            userId: newUser._id, 
        });
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        })
    }
}   

exports.login = async(req, res) => {
    //check for error
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: errors.array()
        })
    }

    const {email, password} = req.body;

    try {
        const user = await User.findOne({email})

        if(!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Password not match"
            })
        }

        //create token
        const payload = {
            userId: user._id
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
            expiresIn: "1d"
        })

        res.cookie("auth_token", token);

        return res.status(200).json({
            success: true,
            message: "User logged in",
            userId: user._id,
            token,
        })
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}
