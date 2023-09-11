const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router({ mergeParams: true });
//my modules
const DB_user_edit = require('../../../Database/DB-user-edit-api');
const DB_auth_user = require('../../../Database/DB-user-auth-api');

const authUtils = require('../../../utils/auth-utils');

router.get('/', async (req, res) => {
    // check if already logged in
    if (req.user == null) {
       return  res.redirect('/user/login');
    }
    console.log('etai user', req.user);
    let userInfo, errors = [];
    userInfo = await DB_auth_user.getLoginInfoByUsername(req.user.USERNAME);
    console.log('eta', userInfo[0]);
    res.render('userlayout.ejs', {
        title: 'Edit Profile - Ghora',
        page: ['profileEdit'],
        user:req.user,
        errors: errors,
        form: {
            name: userInfo[0].NAME,
            email: req.user.EMAIL,
            phone: userInfo[0].PHONE,
            sex: userInfo[0].SEX,
            wallet: userInfo[0].WALLET_ID
        }
    });

});
router.post('/', async (req, res) => {
    if (req.user == null) {
        return res.redirect('/user/login');
    }

    console.log(req.body);
    let results,resphone,resusername,resw, errors = [];
    results = await DB_auth_user.getUsernameByEmail(req.body.email);
    resphone = await DB_auth_user.getUsernameByPhone(req.body.phone);
    resw = await DB_auth_user.getUserByWallet(req.body.wallet);
    console.log("phone =",req.body.phone)
    
    if (results.length > 0) {
        if (results[0].USERNAME != req.user.USERNAME) {
            errors.push('Email is already registered to a user');
        }
    }

    if (resphone.length > 0) {
        if (resphone[0].USERNAME != req.user.USERNAME)
            errors.push('Phone number is already registered to a USER');
    }
    if (resw.length > 0) {
        if (resw[0].USERNAME != req.user.USERNAME)
            errors.push('wallet is already registered to another user');
    }
    if (req.body.phone.length != 11 && req.body.phone.length!=13)
        errors.push('Phone no must start with 8801');
    
    if (errors.length > 0) {
        res.render('userlayout.ejs', {
            title: 'Sign Up - Ghora',
            page: ['profileEdit'],
            user: req.user,
            errors: errors,
            form: {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                sex: req.body.sex,
                wallet: req.body.wallet
            }
        });
    } else {
        let user = {
            username:req.user.USERNAME,
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            sex: req.body.sex,
            wallet: req.body.wallet
        }

        // await bcrypt.hash(user.password, 8, async (err, hash) => {
        //     if (err) {
        //         console.log("ERROR hashing password");
        //     } else {
        //user.password = hash;
        console.log('kkkkkkk', req.user.EMAIL);
        console.log(user);
        let result = await DB_user_edit.updateUserInfo(user);

        //let result2 = await DB_auth_user.getLoginInfoByEmail(user.email);
        // login the user too
        //await DB_cart.addNewCart(result2[0].ID);
        //await authUtils.loginuser(res, result2[0].EMAIL)
        // redirect to home page
        //res.redirect(`/profile/${user.handle}/settings`);
        res.redirect('/user/info');

        //     }
        // });
    }

});

module.exports = router;