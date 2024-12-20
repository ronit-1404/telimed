import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true,
    },
    email: {
        type:String,
        required: true
    },
    password: {
        type:String,
        required:true
    },
    speciality: {
        type:String,
        required:true
    },
    degree: {
        type:String,
        required: true
    },
    experience: {
        type:String,
        required:true
    },
    about: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
    },
    fees: {
        type: Number,
        required:true
    },
    address: {
        type: Object,
        required: true
    },
    date: {
        type: Number,
        required: true
    },
    slots_booked: {
        type: Object,
        default:{}
    }
},{minimize:false}) //we add ,{minimize:false} here so that we can store empty object in data

const doctorModel = mongoose.models.doctor || mongoose.model('doctor',doctorSchema)

export default doctorModel