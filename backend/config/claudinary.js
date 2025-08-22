import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()



async function uploadOnCloudinary(filepath) {
  
cloudinary.config({ 
  cloud_name: process.env.CLAUDINARY_NAME, 
  api_key: process.env.CLAUDINARY_API_KEY, 
  api_secret: process.env.CLAUDINARY_API_SECRET
});
  try {
    if (!filepath) {
      return null
    }
    const result = await cloudinary.uploader.upload(filepath, {
      resource_type: 'auto',
    });
    fs.unlinkSync(filepath);
    return result.secure_url;
  } catch (error) {
    fs.unlinkSync(filepath);
    console.error(error);
  }
}

export default uploadOnCloudinary