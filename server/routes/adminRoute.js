import express from 'express'
import { addDoctor, loginAdmin, allDoctor, appointmentsAdmin, appointmentCancel, adminDashboard  } from '../controllers/adminController.js'
import {upload} from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAdmin.js'
import { changeAvailabity } from '../controllers/doctorController.js'


const adminRouter = express.Router()
//now using the above router multiple endpoints can be created

//when ever we call this endpoint then in form data we have to send image with filed name image then only our middleware will process that image and form data 
//authAdmin middelware will verify the token and then only we can adddoctor
adminRouter.post('/add-doctor',authAdmin,upload.single('image'),addDoctor)
//at the above end point adddoctor function 


//first we were getting error (cannot post /api/admin/login)
//therefore we have created middleware which just console.log that if we have hit login endpoint or not and then execute next()
adminRouter.post('/login',(req,res,next)=>{
    console.log('login endpoint hit');
    next();
},loginAdmin)

adminRouter.post('/all-doctors',authAdmin,allDoctor)
adminRouter.post('/change-availability',authAdmin,changeAvailabity)
adminRouter.get('/appointments',authAdmin,appointmentsAdmin)
adminRouter.post('/cancel-appointment',authAdmin,appointmentCancel)
adminRouter.get('/dashboard',authAdmin,adminDashboard)
export default adminRouter