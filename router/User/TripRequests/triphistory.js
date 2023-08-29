//libraries
const express = require('express');
const DB_user_trips = require('../../../Database/DB-user-trips');
const { json } = require('body-parser');
const DB_user = require('../../../Database/DB-user-api');


const processrequest = require('../../Map/processRequest');
//creating routers
const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
    if (req.user == null) {
        return res.redirect('/user/login');
    }
    let userInfo,triphistory=[];
    userInfo=await DB_user.getAllInfoByUsername(req.user.USERNAME);
    triphistory=await DB_user_trips.getAllTripsByUsername(req.user.USERNAME);

    console.log('kaha fas gaya');

   
    res.render('userLayout.ejs', {
        user: req.user,
        page: ['userTripHistory'],
        title: req.user.NAME,
        info: userInfo,
        history: triphistory,
        navbar: 1
    });
});

module.exports = router;