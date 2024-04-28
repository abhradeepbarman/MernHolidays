const express = require("express")
const router = express.Router()
const {login, logout, sendOtp} = require("../controllers/Auth") 
const {verifyToken} = require("../middleware/auth")
const {register} = require("../controllers/Auth") 

router.post("/sendOtp", sendOtp)
router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)

module.exports = router