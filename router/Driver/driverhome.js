// libraries
const express = require('express');
//const DB_admin_stats = require('../../Database/DB-admin-stats-api');
const DB_drivers=require('../../Database/DB-driver-api');

// creating router
const router = express.Router({mergeParams : true});

//sub routers
const tripReqRouter=require('./TripRequests/requests');

//HOME page
router.get('/', async (req, res) =>{

    if( req.driver == null ){
        console.log('driver nai');
        return res.redirect('/Driver/login');
    }
    let e_mail=req.driver.email;
    const driverInfo=await DB_drivers.getDriverByEmail(e_mail);
    //res.status(200).json(driverInfo.data);
    res.render('driverLayout.ejs', {
        title:'home',
        page:'driverHome',

    });

});

//setting up sub routers
router.use('/requests',tripReqRouter);

module.exports = router;