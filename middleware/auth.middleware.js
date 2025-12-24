const jwt = require('jsonwebtoken');
const User = require('../models/user.models')
const asyncHandler = require('express-async-handler');

const jwtverify = (async (req,res,next)=>{
    try{
        const jwtToken = req.cookies.accesstoken || req.headers['authorization']?.split(' ')[1];
        if(!jwtToken) return res.status(401).json({message: 'Access token is missing'})
const decodedToken = jwt.verify(jwtToken, process.env.ACCESS_TOKEN_SECRET);
const user = await User.findById(decodedToken._id).select('-password -email')
if(!user) return res.status(401).json({message:'Unauthorized'})
    req.user = user
next();
}
catch(err){
    console.error(err);
    return res.status(401).json({message: 'invalid access token' })
}
})
module.exports = jwtverify;