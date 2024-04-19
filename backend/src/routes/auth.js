const express = require("express")
const router = express.Router()
const {login, logout} = require("../controllers/Auth") 
const {verifyToken} = require("../middleware/auth")
const {register} = require("../controllers/Auth") 

router.post("/register", register)
router.post("/login", login)
router.post("/logout", verifyToken, logout)

module.exports = router