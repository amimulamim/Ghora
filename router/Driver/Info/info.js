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
        res.render('driverLayout.ejs',{
            driver: req.driver,
            page:['driverInfo'],
            title:req.driver.NAME,
            info:driverInfo,
            navbar:1
        });

    }
});


// ROUTE: login (post)
// Launches when submit button is pressed on form
// router.post('/', async (req, res) => {
//     // if not logged in take perform the post
//     if(req.driver == null){
//         let results, errors = [];
//         // get login info for handle (id, handle, password)
//         results = await DB_auth_driver.getLoginInfoByEmail(req.body.email);
//         //console.log(results[0].PASSWORD);
//         //console.log(req.body.password);

//         // if no result, there is no such user
//         if(results.length == 0){
//             errors.push('No such user found');
//         } else {
//             // match passwords
//             const match = await bcrypt.compare(req.body.password, results[0].PASSWORD);
//             if(!match){
//                 // if successful login the driver
//                 console.log('dhukse');
//                 await authUtils.loginDriver(res, req.body.email);
//             }
//             else{
//                 errors.push('wrong password');
//             }
//         }

//         // if any error, redirect to login page but with form information, else redirect to homepage
//         if(errors.length == 0){
//             {
//                 console.log('hahaha');
//                 res.redirect('/driver');
//             }
//         } else {
//             res.render('driverLayout.ejs', {
//                 title : 'Login - Ghora',
//                 page : ['driverLogin'],
//                 driver : null,
//                 errors : errors,
//                 form: {
//                     email: req.body.email,
//                     password: req.body.password
//                 }
//             });
//         }
//     } else {
//         //console.log(req.user);
//         res.redirect('/driver');
//     }
// });

module.exports = router;