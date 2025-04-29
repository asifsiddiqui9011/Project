// const cloudinary = require('cloudinary').v2;
// const { CloudinaryStorage } = require('multer-storage-cloudinary'); 

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key : process.env.CLOUD_API_KEY,
//     api_secret: process.env.CLOUD_API_SECRET
// });


// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//       folder: 'AiGadgets', // The name of the folder in Cloudinary
//       allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff', 'webp'],
//     },
//   });


//   module.exports = { cloudinary, storage }



// cloudinaryConfig.js
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require("dotenv").config(); // Loads environment variables from .env

// Configure Cloudinary using your environment variables.
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // e.g., 'mycloudname'
  api_key: process.env.CLOUDINARY_API_KEY,       // e.g., '1234567890'
  api_secret: process.env.CLOUDINARY_API_SECRET, // e.g., 'mysecretkey'
});

console.log("Cloudinary configuration loaded.");
console.log("Cloudinary Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("Cloudinary API Key:", process.env.CLOUDINARY_API_KEY);

// Create a Cloudinary storage instance that applies a transformation
// for image compression and dimension fixing.
const storage = new CloudinaryStorage({

  cloudinary,
  params: {
    folder: "AiGadgets/products", // Folder in Cloudinary.
    allowed_formats: ["jpg", "jpeg", "png", 'gif', 'bmp', 'tiff', 'webp',"AVIF","avif"],
    transformation: [
      {
        width: 600,         // Set maximum width of 800 px
        height: 600,        // Set maximum height of 600 px
        crop: "limit",      // Limit dimensions without stretching the image.
        quality: "auto:good" // Automatically compress image quality.
      }
    ],
    // Generate a custom public_id.
    // Note: Cloudinary automatically appends the file extension.
    public_id: (req, file) => `${file.fieldname}_${Date.now()}`
  },
});

module.exports = {
  cloudinary,
  storage,
};