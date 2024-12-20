import validator from "validator"
import bycrypt from 'bcrypt'
import {v2 as cloudinary} from "cloudinary"
import doctorModel from "../models/doctormodel.js"
//api for adding doctor
const addDoctor = async () => {//it is an async function because it requires time to add doctor in database

    try{
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body; //this data is sent using form data so we need middlware for that we use multer middleware for this

        const imagefile = req.file;

        // console.log({name,email, password, speciality, degree, experience, about, fees, address}, imagefile)
        
        if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address){
            return res.json({success:false,message:"Missing Details"})
        }

        //vaildating email format
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid email"})
        }

        //validating strong pass
        if(password.length < 8){
            return res.json({success:false,message:"Please enter strong password"})
        }

        //hashing doc pass
        const salt = await bycrypt.genSalt(10)
        const hashedpass = await bycrypt.hash(password,salt)

        //upload image to couldinary
        const imageupload = await cloudinary.uploader.upload(imagefile.path, {resource_type:"image"})
        const imageUrl = imageupload.secure_url


        //save data in database
        const doctorData = {
            name,
            email,
            image:imageUrl,
            password:hashedpass,
            speciality,
            degree,
            experience,
            about,
            fees,
            address:JSON.parse(address),
            date:Date.now()
        }

        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()

        res.json({success:true,message:"Doctor added Succesfully"})
    }catch (error){
        console.log(error)
        res.json({success:false,message: error.message})
    }
}

export   {addDoctor}