import validator from 'validator'
import bycrypt from 'bcrypt'
import userModel from '../models/usermodel.js'
import jwt from 'jsonwebtoken'
//api to register user
const registerUser = async (req,res) => {
    try {
        const { name, email, password } = req.body
        
        if(!name || !password || !email){
            return res.json({success:false,message:"Misssing details"})
        }
        //validating email format
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"enter a valid email"})
        }
        //validating strong pass
        if(password.length < 8){
            return res.json({success:false,message:"enter a valid strong password"})
        }

        //hashing user pass
        const salt = await bycrypt.genSalt(10);
        const hashedpass = await bycrypt.hash(password,salt)

        const userData = {
            name,
            email,
            password:hashedpass
        }

        //add new user in database
        const newuser = new userModel(userData)
        const user = await newuser.save()

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
        
        //send token in header
        res.json({success:true,token})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

const loginUser = async (req,res) => {
    try {
        const{email,password} = req.body
        const user = await userModel.findOne({email})

        if(!user){
           return res.json({success:false,message:'user do not exist pls register first'})
        }

        const ismatch = await bycrypt.compare(password,user.password)

        if(ismatch){
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
            res.json({success:true,token})
        }else{
            //note we are wraping response in {} braces because we want to send it as an object
            res.json({success:false,message:"Invalid login or password"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

export {registerUser,loginUser}