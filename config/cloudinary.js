require('dotenv').config();
const cloudinary = require('cloudinary').v2
//used directly cloudinary url so no need to use cloudinary.config directly sdk reads cloudinary url
module.exports = cloudinary