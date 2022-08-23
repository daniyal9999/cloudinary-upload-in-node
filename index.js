const express = require('express')
const cloudinary = require('cloudinary').v2
const fileupload = require('express-fileupload')
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(fileupload({
    useTempFiles:true,
    limits:{ fileSize: 50*1024*1024}
}))

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
  });

app.get('/',(req,res)=>{
    res.send("ok")
})
app.post('/upload/cloud',async (req,res)=>{
    const file = req.files.image
    const result = await cloudinary.uploader.upload(file.tempFilePath,{
        public_id:`${Date.now()}`,
        resource_type: "auto",
        folder:"images"
    })
    res.json(result.url)
  })

  app.listen(4000, ()=>{
    console.log('app listening on 4000');  
  })
  