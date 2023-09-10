const express = require('express');
//const DB_admin_stats = require('../../Database/DB-admin-stats-api');
const db_img=require('../../../Database/DB-image');


// creating router
const router = express.Router({mergeParams : true});

const multer=require('multer');


const storage=multer.diskStorage({
destination:function(req,file,cb){
    cb(null,'./public/images/')
},
filename:function(req,file,cb){
cb(null,file.originalname)
}

});
//Users/Acer/Desktop/oraclenodejs/Ghora/public/images/

const upload=multer({storage:storage})
//C:\Users\Acer\Desktop\oraclenodejs\Ghora\public\images


router.post('/',upload.single('photo'),async(req, res,next) => {
    if (req.driver == null) {
        console.log('ekhane somapti file=',req.file)
        return res.redirect('/driver/login');
    }
    if (req.file == null) {
        console.log('ekhane file nai=',req.file)
        return res.redirect('/driver/login');
    }
    console.log('driver ase,photo update koro')
    console.log("file= ",req.file);
    await db_img.setImageOfDriver(req.driver.ID,req.file.originalname);
    console.log("did,file= ",req.driver.ID,' ',req.file.originalname)



    res.redirect('/driver');
    });




module.exports = router;