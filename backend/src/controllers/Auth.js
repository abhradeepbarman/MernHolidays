const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const otpGenerator = require('otp-generator')
const OTP = require("../models/OTP")

exports.sendOtp = async(req, res) => {
    const {email} = req.body;

    try {
        //check user already exist or not
        const checkUserPresent = await User.findOne({email})

        if(checkUserPresent) {
            return res.status(400).json({
                success: false,
                message: "User already registered!",
            })
        }

        //otp generate
        let otp = otpGenerator.generate(4, { 
            upperCaseAlphabets: false, 
            specialChars: false,
            lowerCaseAlphabets: false,
        });

        //check unique otp or not
        let result = await OTP.find({otp})

        if(result) {
            otp = otpGenerator.generate(4, { 
                upperCaseAlphabets: false, 
                specialChars: false,
                lowerCaseAlphabets: false,
            });

            result = await OTP.find({otp})
        }

        //save otp in db  
        await OTP.create({
            email,
            otp,
        })

        //return response
        return res.status(200).json({
            success: true,
            message: "OTP sent successfully",
        })
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        })
    }
}

exports.register = async(req, res) => {
    const {email, password, confirmPassword, firstName, lastName, otp} = req.body

    if(!email || !password || !confirmPassword || !firstName || !lastName || !otp) {
        return res.status(400).json({
            success: false,
            message: "All the fields are required"
        })
    }

    try {
        //check user exists or not
        let user = await User.findOne({email})
        
        //user already registered, do not need to register
        if(user) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }

        //find recent otp
        const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
        console.log(recentOtp);
        if(recentOtp.length === 0 ) {
            return res.status(400).json({
                success: false,
                message: "OTP not found",
            })
        }

        //verify otp
        if(recentOtp[0].otp !== otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
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

        const token = jwt.sign({
            userId: newUser._id,
            email: newUser.email
        }, 
        process.env.JWT_SECRET_KEY, 
        {
            expiresIn: "2d"
        })

        res.cookie("auth_token", token, {
            httpOnly: true,
            maxAge: 2*24*60*60*1000,
        })

        return res.sendStatus(200);
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
    const {email, password} = req.body;

    if(!email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required",
        })
    }

    try {
        const user = await User.findOne({ email })

        if(!user) {
            return res.status(400).json({
                success: false,
                message: "User not registered"
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
        const token = jwt.sign(
        {
            userId: user._id,
            email: user.email
        }, 
        process.env.JWT_SECRET_KEY, 
        {
            expiresIn: "2d"
        })


        res.cookie("auth_token", token, {
            httpOnly: true,
            maxAge: 2*24*60*60*1000,
        })

        res.status(200).json({
            userId: user._id,
            message: "Logged in successfully",
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

exports.logout = async(req, res) => {
    res.cookie("auth_token", "", {
        expires: new Date(0)
    })

    return res.status(200).json({
        success: true,
        message: "User succesfully logged out",
    })
}