const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router({ mergeParams: true });
//my modules
const DB_driver_edit = require('../../../Database/DB-driver-edit-api');
const DB_auth_driver = require('../../../Database/DB-driver-auth-api');

const authUtils = require('../../../utils/auth-utils');

router.get('/', async (req, res) => {
    // check if already logged in
    if (req.driver == null) {
        return res.redirect('/driver/login');
    }
    console.log('etai driver', req.driver);
    let driverInfo, errors = [];
    driverInfo = await DB_auth_driver.getLoginInfoByID(req.driver.ID);
    console.log('eta', driverInfo[0]);
    res.render('driverlayout.ejs', {
        title: 'Edit Profile - Ghora',
        page: ['profileEdit'],
        driver: req.driver,
        errors: errors,
        form: {
            name: driverInfo[0].NAME,
            email: req.driver.EMAIL,
            phone: driverInfo[0].PHONE,
            sex: driverInfo[0].SEX,
            wallet: driverInfo[0].WALLET_ID,
           // image:driverInfo[0].IMAGE
        }
    });

});
router.post('/', async (req, res) => {
    if (req.driver == null) {
        return res.redirect('/driver/login');
    }

    console.log(req.body);
    let results, resphone,resw, errors = [];
    results = await DB_auth_driver.getDriverIDByEmail(req.body.email);

    let phonecheck=req.body.phone;
    if(phonecheck.length==11){
        phonecheck='88'+phonecheck;
    }
    
    resphone = await DB_auth_driver.getDriverIDByPhone(phonecheck);
    resw = await DB_auth_driver.getDriverByWallet(req.body.wallet);

    if (results.length > 0) {
        if (results[0].ID != req.driver.ID)
            errors.push('Email is already registered to a user');
    }

    if (resphone.length > 0) {
        if (resphone[0].ID != req.driver.ID)
            errors.push('Phone number is already registered to a driver');
    }

    if (resw.length > 0) {
        if (resw[0].ID != req.driver.ID)
            errors.push('wallet is already registered to another driver');
    }


    

    if ((req.body.phone.length != 13 && req.body.phone.length!=11) || !(phonecheck.startsWith('8801'))) {
        errors.push('Phone number must be 88.. +11 digits  and have total 13 digits');
    }
    if (errors.length > 0) {
        res.render('driverlayout.ejs', {
            title: 'Sign Up - Ghora',
            page: ['profileEdit'],
            driver: req.driver,
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
        let driver = {
            id: req.driver.ID,
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            sex: req.body.sex,
            wallet: req.body.wallet,
            
        }

        // await bcrypt.hash(driver.password, 8, async (err, hash) => {
        //     if (err) {
        //         console.log("ERROR hashing password");
        //     } else {
        //driver.password = hash;
        console.log('kkkkkkk', req.driver.EMAIL);
        console.log(driver);
        let result = await DB_driver_edit.updateDriverInfo(driver);

        //let result2 = await DB_auth_driver.getLoginInfoByEmail(driver.email);
        // login the user too
        //await DB_cart.addNewCart(result2[0].ID);
        //await authUtils.loginDriver(res, result2[0].EMAIL)
        // redirect to home page
        //res.redirect(`/profile/${user.handle}/settings`);
        res.redirect('/driver/info');

        //     }
        // });
    }

});

module.exports = router;