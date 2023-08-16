// libraries
const express = require('express');
const bcrypt = require('bcrypt');

// my modules
const DB_auth_user = require('../../../Database/DB-user-auth-api');
const authUtils = require('../../../utils/auth-utils');

// creating router
const router = express.Router({mergeParams : true});

// ROUTE: login (get)
router.get('/', (req, res) => {
    // if not logged in take to login page








    if(req.user == null){
        const errors = [];
        return res.render('usersLayout.ejs', {
            title : 'Login - Ghora',
            page : 'userLogin',
            user : null,
            form: {
                email: "",
                password: ""
            },
            errors : errors
        })
    } else {
        res.redirect('/users');
    }
});


// ROUTE: login (post)
// Launches when submit button is pressed on form
router.post('/', async (req, res) => {
    // if not logged in take perform the post
    if(req.user == null){
        let results, errors = [];
        // get login info for handle (id, handle, password)
        results = await DB_auth_user.getLoginInfoByEmail(req.body.email);
        //console.log(results[0].PASSWORD);
        //console.log(req.body.password);

        // if no result, there is no such user
        if(results.length == 0){
            errors.push('No such user found');
        } else {
            // match passwords
            const match = await bcrypt.compare(req.body.password, results[0].PASSWORD);
            if(!match){
                // if successful login the driver
                console.log('dhukse');
                await authUtils.loginUser(res, req.body.email);
            }
            else{
                errors.push('wrong password');
            }
        }

        // if any error, redirect to login page but with form information, else redirect to homepage
        if(errors.length == 0){
            {
                console.log('hahaha');
                res.redirect('/users');
            }
        } else {
            res.render('usersLayout.ejs', {
                title : 'Login - Ghora',
                page : 'userLogin',
                user : null,
                errors : errors,
                form: {
                    email: req.body.email,
                    password: req.body.password
                }
            });
        }
    } else {
        //console.log(req.user);
        res.redirect('/users');
    }
});

module.exports = router;