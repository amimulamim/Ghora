// libraries
const express = require('express');
const DB_user_auth = require('../../../Database/DB-user-auth-api');

// creating router
const router = express.Router({mergeParams : true});

router.post('/', async (req, res) =>{
    // if logged in, delete token from database
    if(req.user !== null){
        // set null in token
        //await DB_auth.updateUserTokenById(req.user.id, null);
    }
    res.clearCookie("userSessionToken");
    res.redirect('/user/login');
});

module.exports = router;