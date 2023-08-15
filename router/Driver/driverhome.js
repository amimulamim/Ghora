// libraries
const express = require('express');
//const DB_admin_stats = require('../../Database/DB-admin-stats-api');
const DB_drivers=require('../../Database/DB-driver-api');

// creating router
const router = express.Router({mergeParams : true});

//HOME page
router.get('/', async (req, res) =>{
    if( req.driver == null ){
        console.log('driver nai');
        return res.redirect('/driver/login');
    }
    let e_mail=req.driver.EMAIL;
    console.log('tererere'+e_mail);
    //const driverInfo=await DB_drivers.getDriverByEmail(e_mail);
    //res.status(200).json(driverInfo.data);
    res.render('driverLayout.ejs', {
        title:'home',
        page:'driverHome',

    });

});

module.exports = router;