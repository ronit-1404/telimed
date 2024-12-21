import jwt from 'jsonwebtoken'

//admin authentication middleware

const authAdmin = async (req,res,next) => {
    try {
        //logic to verify the token
        //we check header if for token
        //if token is present in header then only user can make further api calls 
        const {admintoken} = req.headers
        if(!admintoken){
            return res.json({success:false,message:"Not Authorized Login Again"})
        }

        //now incase we have admin token we need to verify it
        //decode this token
        const token_decode = jwt.verify(admintoken,process.env.JWT_SECRET)
        //note decoded token will contain our email id and password

        if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.json({success:false,message:"Not Authorized Login Again"})
        }

        //if token matches call next()
        next()
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export default authAdmin