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
    driverInfo = await DB_auth_driver.getLoginInfoByID(req.driver.ID);
    console.log('eta', driverInfo[0]);
    res.render('driverlayout.ejs', {
        title: 'Edit Profile - Ghora',
        page: ['driverPasswordEdit'],
        driver: req.driver,
        errors: errors,
        form: {
            prevpass: "",
            newpass: ""
            //sex:req.body.sex
        }
    });

});
router.post('/', async (req, res) => {
    if (req.driver == null) {
        return res.redirect('/driver/login');
    }

    console.log(req.body);
    let results, errors = [];
    results = await DB_auth_driver.getLoginInfoByID(req.driver.ID);
    console.log('compare ' + results[0].PASSWORD);
    const match = await bcrypt.compare(req.body.prevpass, results[0].PASSWORD);
    if (match) {
        if (req.body.newpass.length >= 6) {
            await bcrypt.hash(req.body.newpass, 8, async (err, hash) => {
                if (err)
                    console.log("ERROR at hashing password: " + err.message);
                else {

                    let p = hash;
                    let result = await DB_auth_driver.changePassword(req.driver.ID, p);
                }
            });
            res.redirect('/driver/info');
        }
        else {
            errors.push('Password Must Be At Least 6 Characters');
        }
    }
    else {
        errors.push('wrong password');
        res.render('driverlayout.ejs', {
            title: 'Edit Profile - Ghora',
            page: ['driverPasswordEdit'],
            driver: req.driver,
            errors: errors,
            form: {
                prevpass: req.body.prevpass,
                newpass: req.body.newpass
                //sex:req.body.sex
            }
        });

    }
});

module.exports = router;