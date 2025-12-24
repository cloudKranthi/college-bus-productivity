const mongoose = require('mongoose');
const connectdb = (async()=>{
    try{
  await mongoose.connect(process.env.MONGO_DB_URI)
  console.log('mongo db connected')
    }catch(error){
  console.log(error)
    }
})
module.exports = connectdb