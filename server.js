const { configDotenv } = require('dotenv');
const express = require('express');
const uploadroute = require('./routes/upload.routes')
const register = require('./routes/registration.routes') 
const connectdb = require('./db/connectdb');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;
connectdb()
.then(()=>{
app.use("/upload",uploadroute);
app.use("register",register);
app.listen(PORT,()=>{

    console.log(`SERVER IS RUNNING ON PORT ${PORT}` )
})
}).catch((err)=>{
    console.log(err);
})

