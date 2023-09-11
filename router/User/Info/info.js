// libraries
const express = require('express');
const bcrypt = require('bcrypt');

// my modules
const DB_user=require('../../../Database/DB-user-api');
const infoEditRouter=require('./editinfo');
const passwordEditRouter=require('./changePassword');
const photoEditRouter=require('./changePhoto.js');
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
        
        userInfo=await DB_user.getAllInfoByUsername(req.user.USERNAME);
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
router.use('/changephoto',photoEditRouter);


module.exports = router;