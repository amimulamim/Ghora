// libraries
const express = require('express');
const bcrypt = require('bcrypt');

// my modules
const DB_driver=require('../../../Database/DB-driver-api');
const DB_driver_edit=require('../../../Database/DB-driver-edit-api');
const DB_vehicle_api=require('../../../Database/DB-vehicle-api');
const vehicleEditRouter=require('./editvehicle');
const infoEditRouter=require('./editinfo');
// const addVehicleRouter=require('./addVehicle');
const passwordEditRouter=require('./changePassword');
//const DB_auth_driver = require('../../../Database/DB-driver-auth-api');
//const authUtils = require('../../../utils/auth-utils');

// creating router
const router = express.Router({mergeParams : true});

// ROUTE: login (get)
router.get('/', async (req, res) => {
    // if not logged in take to login page
    if(req.driver == null){
       return res.redirect('/driver/login');
    } else {
        let driverInfo=[];
        console.log("here psaisi "+req.driver.EMAIL);
        
        driverInfo=await DB_driver.getAllInfo(req.driver.EMAIL);
        // let has=1;
        // if(driverInfo[0].PLATE_NO===null)
        // has=0
       // console.log(driverInfo[0].NAME);
       console.log(driverInfo[0].PHONE);
        res.render('driverLayout.ejs',{
            driver: req.driver,
            page:['driverInfo'],
            title:req.driver.NAME,
            info:driverInfo,
            navbar:1
        });

    }
});


// router.post('/', async (req, res) => {
//     if (req.driver == null) {
//         return res.redirect('/driver');
//     }
//     else{
//         res.redirect('/driver/edit');
//     }
// });

//subrouters

router.use('/edit',infoEditRouter);
router.use('/editvehicle',vehicleEditRouter);
router.use('/changepassword',passwordEditRouter);


module.exports = router;