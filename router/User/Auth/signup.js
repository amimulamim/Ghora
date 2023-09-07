// libraries
const express = require('express');
const bcrypt = require('bcrypt');

// my modules
const DB_auth_user = require('../../../Database/DB-user-auth-api');
const authUtils = require('../../../utils/auth-utils');

// creating router
const router = express.Router({mergeParams : true});

// ROUTE: sign up (get)
router.get('/', (req, res) => {
    // check if already logged in
    if(req.user == null){
        const errors = [];
        res.render('userlayout.ejs', {
            title : 'Sign Up - Ghora',
            page : ['userSignup'],
            user : null,
            errors : errors
        });
    } else {
        res.redirect('/user');
    }
});

// ROUTE: sign up (post)
router.post('/', async (req, res) => {
    // check if already logged in
    if(req.user == null){
        let results, errors = [];
/*
        let regex = /^[a-zA-Z0-9_]+$/;
        // check if handle is valid (letter+digit+_)
        if(regex.test(req.body.handle)){
            // if valid, check if handle can be used
            // TODO restrict keywords
            results = await DB_auth.getUserIDByHandle(req.body.handle);
            if(results.length > 0)
                errors.push('Handle is already registered to a user');
        }
        else{
            errors.push('Handle can only contain English letters or digits or underscore');
        }*/

        // check if email is alredy used or not
        console.log(req.body);
        results = await DB_auth_user.getUsernameByEmail(req.body.email);
        resphone = await DB_auth_user.getUsernameByPhone(req.body.phone);
        console.log("phone =",req.body.phone)
        resusername=await DB_auth_user.getLoginInfoByUsername(req.body.username);
        
        
        if(results.length > 0)
            errors.push('Email is already registered to a user');
       
        if(resphone.length > 0)
            errors.push('Phone number is already registered to a user');

        if(resusername.length>0){
            errors.push('Username is already registered to a user');
        }

        // check if password confimation is right
        if(req.body.password !== req.body.password2)
            errors.push('Password confirmation doesn\'t match with password');

        // check if password has at least 6 char
        if(req.body.password.length < 6){
            errors.push('Password must be at least 6 characters');
        }
        //check valid phone no.
        if(req.body.phone.length!=11 && req.body.phone.length!=13){
            errors.push('Valid phone number must be provided');
        }


        // if there are errors, redirect to sign up but with form informations
        if(errors.length > 0){
            res.render('userlayout.ejs', {
                title : 'Sign Up - Ghora',
                page : ['userSignup'],
                user : null,
                errors : errors,
                form : {
                    username:req.body.username,
                    name : req.body.name,
                    email : req.body.email,
                    password : req.body.password,
                    password2 : req.body.password2,
                    phone:req.body.phone,
                    sex:req.body.sex
                }
            });
        }
        else{
            // if no error, create user object to be sent to database api
            let user = {
                username:req.body.username,
                name: req.body.name,
                password: req.body.password,
                email: req.body.email,
                phone:req.body.phone,
                sex:req.body.sex
            }
            // hash user password
            await bcrypt.hash(user.password, 8, async (err, hash) =>{
                if(err)
                    console.log("ERROR at hashing password: " + err.message);
                else{
                    // create user via db-api, id is returned
                    user.password = hash;
                    let result = await DB_auth_user.createNewUser(user);
                    
                    let result2 = await DB_auth_user.getLoginInfoByEmail(user.email);
                    // login the user too
                    //await DB_cart.addNewCart(result2[0].ID);
                    if(result2[0]==undefined){
                        console.log("ERROR at creating user");
                    }
                    else{
                    await authUtils.loginUser(res, result2[0].USERNAME);
                    // redirect to home page
                    //res.redirect(`/profile/${user.handle}/settings`);
                    res.redirect('/user');
                    }
                }
            });
        }
    } else {
        res.redirect('/user');
    }
});

module.exports = router;