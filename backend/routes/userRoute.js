import express from 'express'
import { isAuth } from '../middlewares/isAuth.js';
import {getCurrentUser} from '../controllers/userController.js';
import { updateProfile } from '../controllers/userController.js';
import { upload } from '../middlewares/multer.js';

const userRoute = express.Router()

userRoute.get("/getcurrentuser", isAuth, getCurrentUser);
userRoute.post("/updateprofile", isAuth, upload.single("photoUrl"), updateProfile);

export default userRoute