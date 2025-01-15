import express from 'express'
import { registerUser,loginUser, getProfile,updateProfile } from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js'
import { upload } from '../middlewares/multer.js'

const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/get-profile',authUser,getProfile)
//below useing two middleware for image uploading and authinticating user
userRouter.post('/update-profile',upload.single('image'),authUser,updateProfile)
export default userRouter