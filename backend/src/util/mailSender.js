const nodemailer = require("nodemailer");
require("dotenv").config()

exports.mailSender = async(email, body) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
              user: process.env.MAIL_USER,
              pass: process.env.MAIL_PASS,
            },
        });

        const info = await transporter.sendMail({
            from: 'MernHolidays.com', 
            to: email, 
            subject: "Email verification", 
            html: `<b>${body}</b>`, 
        });

        console.log("Email sent successfully!");
        return info;
    } 
    catch (error) {
        console.log("error sending email");    
        console.log(error);
    }
}
