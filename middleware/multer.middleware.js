const multer = require('multer');
const fs = require('fs');
const path = require('path');
const uploadimage = path.join(__dirname,'/uploadimage')
    fs.mkdirSync(uploadimage,{recursive:true})

const storage = multer.diskStorage({destination:(req,file,cb)=>{
    cb(null,uploadimage)
},
filename:(req,file,cb)=>{
    const ext = path.extname(file.originalname)
    const extname =`${Date.now()}-${Math.round(Math.random()*1e9)}${ext}`
    cb(null,extname)
}})
const fileFilter = 
    (req,file,cb)=>{
        const ext=path.extname(file.originalname).slice(1)
    if((ext !='png')&& (ext!='jpg')){
        cb(new Error('upload images in jpg or png format'),false)
    }
    else{
    cb(null,true)
    }
    }

const upload = multer({storage,
    fileFilter,
    limits:
    {fileSize:5*1024*1024}
})
module.exports = upload;