const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const jwtverify = require('../middleware/auth.middleware')
const User = require('../models/user.models')
const cloudinary = require('cloudinary').v2
const generate_access_refresh_token = asyncHandler(async(user)=>{
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    return {accessTone,refreshToken};
})
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
const loginUser = asyncHandler(async(req,res)=>{
    const {email,password}= req.body;
    if(!email || !password){
        return res.status(400).json({message:'email and password are required'})
    }
    const user = await User.findOne({email})
    if(!user){
        return res.status(404).json({message:'User does not exist '})
    }
    const ispassword = await bcrypt.compare(password,user.password)

    if(!ispassword){
        return res.status(401).json({message:'Password is incorrect'})
    }
    const {accessToken,refreshToken} = generate_access_refresh_token(user);
    const options={httpOnly:true,secure:false,samesite:'None'}
    return res.cookie('accessToken',accessToken,{...options}).cookie('refreshToken',refreshToken,{...options}).json({message:'User logged in succesfully',tokens:{accessToken,refreshToken}})

})
const refreshController = asyncHandler(async(req,res)=>{
    const refreshToken = req.cookies.refreshToken || req.headers['authorization']?.split(' ')[1];
    if(!refreshToken){
        return res.status(401).json({message:'refresh token is missing'})
    }
    let decodedToken;
    try{
      decodedToken = jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET)
    }catch(error){
        return res.status(401).json({message:'invalid refresh token'})
    }
    const user = await User.findById(decodedToken.id)
    if(!user || user.refreshToken !== refreshToken){
        return res.status(401).json({message:'unauthorized'})
    }
    const {accessToken,refreshToken:newRefreshToken} = generate_access_refresh_token(user);
    user.refreshToken = newRefreshToken;
    await user.save();
    const options={httpOnly:true,samesite:'None',secure:false}
    return res.status(200).cookie('accessToken',accessToken,{...options}).cookie('refreshToken',newRefreshToken,{...options}).json({message:'Token refreshed Succesfully'})

})
const logoutUser = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user._id)
    user.refreshToken = null;
    const options= {httpOnly:true,secure:false,samesite:'None',expires:new Date(0)}
    await user.save()
    return res.cookie('refreshToken','',options).cookie('accessToken','',options).status(200).json({message:'User loggedOut succesfully'})
})
module.exports = {uploadimage,registerUser,loginUser,refreshController,logoutUser};