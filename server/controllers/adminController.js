import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctormodel.js";

// API for adding doctor
const addDoctor = async (req, res) => { // Add req and res as parameters
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body; // Data sent using form data
        const imagefile = req.file;

        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.json({ success: false, message: "Missing Details" });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        // Validate password strength
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        // Upload image to Cloudinary
        const imageUpload = await cloudinary.uploader.upload(imagefile.path, { resource_type: "image" });
        const imageUrl = imageUpload.secure_url;

        // Save data to the database
        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPass,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address), // Parse address if it's a JSON string
            date: Date.now()
        };

        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();

        console.log("Doctor added");
        res.status(200).json({ success: true, message: "Doctor added successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export { addDoctor };
