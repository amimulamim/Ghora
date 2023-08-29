// libraries
const express = require('express');
const bcrypt = require('bcrypt');

// my modules
const DB_user=require('../../../Database/DB-user-api');
const infoEditRouter=require('./editinfo');
const passwordEditRouter=require('./changePassword');
//const DB_auth_user = require('../../../Database/DB-user-auth-api');
//const authUtils = require('../../../utils/auth-utils');

// creating router
const router = express.Router({mergeParams : true});

// ROUTE: login (get)
router.get('/', async (req, res) => {
    // if not logged in take to login page
    if(req.user == null){
       return res.redirect('/user/login');
    } else {
        let userInfo=[];
        console.log("here psaisi "+req.user.EMAIL);
        
        userInfo=await DB_user.getAllInfo(req.user.EMAIL);
       // console.log(userInfo[0].NAME);
        res.render('userLayout.ejs',{
            user: req.user,
            page:['userInfo'],
            title:req.user.NAME,
            info:userInfo,
            navbar:1
        });

    }
});
router.use('/edit',infoEditRouter);
router.use('/changepassword',passwordEditRouter);


// ROUTE: login (post)
// Launches when submit button is pressed on form
// router.post('/', async (req, res) => {
//     // if not logged in take perform the post
//     if(req.user == null){
//         let results, errors = [];
//         // get login info for handle (id, handle, password)
//         results = await DB_auth_user.getLoginInfoByEmail(req.body.email);
//         //console.log(results[0].PASSWORD);
//         //console.log(req.body.password);

//         // if no result, there is no such user
//         if(results.length == 0){
//             errors.push('No such user found');
//         } else {
//             // match passwords
//             const match = await bcrypt.compare(req.body.password, results[0].PASSWORD);
//             if(!match){
//                 // if successful login the user
//                 console.log('dhukse');
//                 await authUtils.loginuser(res, req.body.email);
//             }
//             else{
//                 errors.push('wrong password');
//             }
//         }

//         // if any error, redirect to login page but with form information, else redirect to homepage
//         if(errors.length == 0){
//             {
//                 console.log('hahaha');
//                 res.redirect('/user');
//             }
//         } else {
//             res.render('userLayout.ejs', {
//                 title : 'Login - Ghora',
//                 page : ['userLogin'],
//                 user : null,
//                 errors : errors,
//                 form: {
//                     email: req.body.email,
//                     password: req.body.password
//                 }
//             });
//         }
//     } else {
//         //console.log(req.user);
//         res.redirect('/user');
//     }
// });

module.exports = router;