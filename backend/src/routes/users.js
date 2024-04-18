const express = require("express")
const router = express.Router()
const {register} = require("../controllers/Auth") 
const {check} = require('express-validator')
const {storeEmail} = require("../controllers/User")

router.post("/register", [
    check("firstName", "First Name is required").isString(),
    check("lastName", "Last Name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({min: 6}),
], register)

router.post("/storeEmail", storeEmail)

module.exports = router