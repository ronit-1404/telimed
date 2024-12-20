import multer from 'multer'

const storage = multer.diskStorage({
    filename: function(req,file,callback){
        callback(null,file.originalname)
    }
})

//instance of multer
const upload = multer({storage})

export  {upload}
//note: now we need create route using this upload middleware