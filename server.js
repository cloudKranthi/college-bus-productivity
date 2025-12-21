const { configDotenv } = require('dotenv');
const express = require('express');
const connectdb = require('./db/connectdb');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;
app.use(connectdb);
app.listen(PORT,()=>{

    console.log(`SERVER IS RUNNING ON PORT ${PORT}` )
})