//libraries
const express = require('express');
const DB_driver_trips = require('../../../Database/DB-driver-trips');
const { json } = require('body-parser');
const DB_driver = require('../../../Database/DB-driver-api');


const processrequest = require('../../Map/processRequest');
//creating routers
const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
    if (req.driver == null) {
        return res.redirect('/driver/login');
    }
    let driverInfo,triphistory=[];
    driverInfo=await DB_driver.getAllInfoByID(req.driver.ID);
    triphistory=await DB_driver_trips.getAllTripsByPlate(driverInfo[0].PLATE_NO);

    console.log('kaha fas gaya');

   
    res.render('driverLayout.ejs', {
        driver: req.driver,
        page: ['driverTripHistory'],
        title: req.driver.NAME,
        info: driverInfo,
        history: triphistory,
        navbar: 1
    });
});

module.exports = router;