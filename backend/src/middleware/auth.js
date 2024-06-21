const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
    console.log("cookies --", req.cookies["auth_token"]);
    const token = req.cookies["auth_token"];
    
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
