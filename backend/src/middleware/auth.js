const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
    const token = req.cookies["auth_token"] || req.body.token || (req.headers.authorization && req.headers.authorization.replace("Bearer ", ""))

    console.log("token--------------", token);
    
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Authentication token is missing",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.userId = decoded.userId;
        next();
    } 
    catch (error) {
        console.error(error);
        return res.status(401).json({
            success: false,
            message: "Invalid or expired authentication token",
        });
    }
};
