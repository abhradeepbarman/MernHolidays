const express = require("express")
const router = express.Router()
const {check} = require('express-validator')
const {storeEmail} = require("../controllers/User")
const { verifyToken } = require("../middleware/auth")
const {getCurrentUser} = require("../controllers/User")

router.post("/storeEmail", storeEmail)
router.get("/me", verifyToken, getCurrentUser);

module.exports = router