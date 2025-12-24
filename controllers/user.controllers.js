const User = require('../models/user.models')
const cloudinary = require('cloudinary').v2
const uploadimage= async(req,res)=>{
    try{
    const cloudinaryuri = await cloudinary.uploader.upload(req.file.path)
    console.log(`Image uploaded on cloudinary ${cloudinaryuri.secure_url}`)
   const updatedUser = await  user.findByIdAndUpdate(req._id,{avatar:cloudinaryuri.secure_url},{new:true})
    }catch(error){
        console.log(error)
    }
}
const registerUser = async(req,res)=>{
    try{
        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:req.body.password
        })
     return res.status(200).json({message:"User registered succesfully"})
    }catch(error){
        console.log(error)
    }
}
module.exports = uploadimage,registerUser;