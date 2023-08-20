// libraries
const express = require('express');
const DB_driver_auth = require('../../../Database/DB-driver-auth-api');

// creating router
const router = express.Router({mergeParams : true});

router.post('/', async (req, res) =>{
    // if logged in, delete token from database
    if(req.driver !== null){
        // set null in token
        //await DB_auth.updateUserTokenById(req.user.id, null);
    }
    res.clearCookie("driverSessionToken");
    res.redirect('/driver/login');
});

module.exports = router;