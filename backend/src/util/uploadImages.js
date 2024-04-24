const cloudinary = require('cloudinary').v2;

exports.uploadImages = async(imageFiles) => {
    const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        let dataURI = "data:" + image.mimetype + ";base64," + b64;
        const response = await cloudinary.uploader.upload(dataURI);
        return response.url;
    });

    //if upload is successful, add the URLs to the new Hotel
    const imageUrls = await Promise.all(uploadPromises);
    return imageUrls;
}