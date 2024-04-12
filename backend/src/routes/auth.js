const express = require("express")
const router = express.Router()
const {check} = require("express-validator")
const {login} = require("../controllers/Auth") 

router.post("/login", [ 
    check("email", "Email is Required").isString(),
    check("password", "Password with 6 or more characters required").isLength({
        min: 6
    })
], login)

module.exports = router