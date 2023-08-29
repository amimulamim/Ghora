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
        res.redirect('/driver/login');
    }
    console.log('etai driver', req.driver);
    let driverInfo, errors = [];
    driverInfo = await DB_auth_driver.getLoginInfoByEmail(req.driver.EMAIL);
    console.log('eta', driverInfo[0]);
    res.render('driverlayout.ejs', {
        title: 'Edit Profile - Ghora',
        page: ['profileEdit'],
        driver: req.driver,
        errors: errors,
        form: {
            name: driverInfo[0].NAME,
            email: req.driver.email,
            phone: driverInfo[0].PHONE,
            sex: driverInfo[0].SEX,
            wallet: driverInfo[0].WALLET_ID
        }
    });

});
router.post('/', async (req, res) => {
    if (req.driver == null) {
        return res.redirect('/driver/login');
    }

    console.log(req.body);
    let results, errors = [];
    // results = DB_auth_driver.getDriverIDByEmail(req.body.email);
    // if (results.length > 0)
    //     errors.push('You can,t change email');
    if (req.body.password != req.body.password2)
        errors.push('PASSWORDS MUST MATCH');
    if (req.body.phone.length != 13)
        errors.push('Phone no must start with 8801');
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
            id:req.driver.ID,
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            sex: req.body.sex,
            wallet: req.body.wallet
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