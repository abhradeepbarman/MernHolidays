const express = require("express")
const router = express.Router()
const {check} = require("express-validator")
const {login} = require("../controllers/Auth") 
const {verifyToken} = require("../middleware/auth")

router.post("/login", [ 
    check("email", "Email is Required").isString(),
    check("password", "Password with 6 or more characters required").isLength({
        min: 6
    })
], login)

router.get("/validate-token", verifyToken, (req, res) => {
    res.status(200).send({userId: req.userId})
})

router.post("/logout", (req, res)=>{
    res.cookie("auth_token", "", {
        expires: new Date(0)
    })

    res.send()
})

module.exports = router