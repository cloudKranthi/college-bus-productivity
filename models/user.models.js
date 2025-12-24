const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        lowercase:true,
        index:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String
    }
},{timestamps:true})
userSchema.pre(('save'),function(){
if(this.isModified("password")){
    this.password = bcrypt.hash(this.password,10);
}})

userSchema.methods.generateAccessToken = function(){
    const userId = this._id;
     const token =jwt.sign({
        id:userId,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn:process.env.ACCESS_TOKEN_EXPIRY}
    )
    return token;

}
userSchema.methods.generateRefreshToken = function(){
    const userId = this._id;
     const token =jwt.sign({
        id:userId,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {expiresIn:process.env.REFRESH_TOKEN_EXPIRY}
    )
    return token;

}
module.exports = mongoose.model('User',userSchema)