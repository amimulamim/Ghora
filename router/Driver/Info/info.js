// libraries
const express = require('express');
const bcrypt = require('bcrypt');

// my modules
const DB_driver=require('../../../Database/DB-driver-api');
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


router.post('/', async (req, res) => {
    if (req.driver == null) {
        return res.redirect('/driver');
    }
    else{
        res.redirect('/driver/edit');
    }
});
module.exports = router;