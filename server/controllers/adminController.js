import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctormodel.js";
import jwt from "jsonwebtoken"
import appointmentModel from "../models/appointmenModel.js";
import userModel from "../models/usermodel.js";
// API for adding doctor
//it is signupprocess
const addDoctor = async (req, res) => {
    try {
        // Destructure request body to extract required fields
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;

        const imagefile = req.file;

       console.log("File received:", imagefile);

        if (!imagefile) {
            return res.status(400).json({ success: false, message: "File is required" });
        }

        // Check if all required fields are provided
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.status(400).json({ success: false, message: "Missing Details" });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email" });
        }

        // Ensure password strength
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Please enter a strong password" });
        }

        // Parse address field (ensure it's valid JSON)
        let parsedAddress;
        if (typeof address === "string") {
            try {
                parsedAddress = JSON.parse(address); // Parse only if it's a string
            } catch (err) {
                return res.status(400).json({ success: false, message: "Invalid address format" });
            }
        } else {
            parsedAddress = address; // Use as-is if it's already an object
        }

        // Generate salt for password hashing
        const salt = await bcrypt.genSalt(10);

        // Hash the password for secure storage
        const hashedPass = await bcrypt.hash(password, salt);

        // Optional: Uncomment the following lines if image upload is required
        const imageUpload = await cloudinary.uploader.upload(imagefile.path, { resource_type: "image" });
        const imageUrl = imageUpload.secure_url;

        // Prepare doctor data object for saving
        const doctorData = {
            name,
            email,
            image: imageUrl, // Include image URL if uploading images
            password: hashedPass,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: parsedAddress,
            date: Date.now(), // Store current timestamp
        };

        // Create a new doctor entry in the database
        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();

        // Log success message and send response
        console.log("Doctor added");
        res.status(200).json({ success: true, message: "Doctor added successfully" });
    } catch (error) {
        // Log error details for debugging
        console.error("Error adding doctor:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// API for admin login
const loginAdmin = async (req, res) => {
    try {
        // Extract email and password from request body
        const { email, password } = req.body;

        // Validate that email and password are provided
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }

        // Ensure environment variables for admin login are set
        if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD || !process.env.JWT_SECRET) {
            throw new Error("Environment variables for admin login are not set");
        }

        // Check if provided credentials match admin credentials from environment variables
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            // Generate a token to keep the admin logged in
            //this token will be set in req.header
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            // Respond with success and the generated token
            return res.status(200).json({ success: true, token });
        } else {
            // Respond with error if credentials are invalid
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        // Log error details for debugging
        console.error("Error during admin login:", error);
        // Respond with internal server error
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

//api to get all doctors list for admin panel

const allDoctor = async (req,res) => {
    try {
        //select method below excludes the password and gets the rest data
        const doctors = await doctorModel.find({}).select('-password')
        res.json({success:true,doctors})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//api to get all apointment list
const appointmentsAdmin = async (req,res) => {
    try {
        //find's all appointment
        const appointments = await appointmentModel.find({})
        res.json({success:true,appointments})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
// Export the functions for use in routes

//api for appointment cancellation
const appointmentCancel = async (req,res) => {
    try {
        
        const {appointmentId} = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        
        await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled:true})

        //releasing doctor's slot
        const {docId, slotDate, slotTime} = appointmentData
        const doctorData = await doctorModel.findById(docId)

        let slots_booked = doctorData.slots_booked

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

        await doctorModel.findByIdAndUpdate(docId, {slots_booked})

        res.json({success:true, message:'appointment cancelled'})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

//api to get dashboard data for admin pannel
const adminDashboard = async (req,res) => {
    try {

        const doctors = await doctorModel.find({})
        const users = await userModel.find({})
        const appoinments = await appointmentModel.find({})

        const dashdata = {
            doctors: doctors.length,
            appointments: appoinments.length,
            patients: users.length,
            latestAppointment: appointments.reverse().slice(0,5)
        }

        res.json({success:true,dashdata})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}
export { addDoctor, loginAdmin, allDoctor,appointmentsAdmin,appointmentCancel,adminDashboard }
