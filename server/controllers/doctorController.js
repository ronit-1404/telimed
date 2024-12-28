import doctorModel from "../models/doctormodel"


const changeAvailabity = async  (req,res) => {
    try {
         
        const {docid} = req.body
        
        const docdate = await doctorModel.findById(docid)

        await doctorModel.findByIdAndUpdate(docid,{available: !docdate.available})
        res.json({success:true,message:'Availabilty changed'})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export {changeAvailabity}