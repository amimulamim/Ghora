//libraries
const express = require('express');
//const DB_trips = require('../../../Database/DB-driver-trips');
const { json } = require('body-parser');
//const DB_driver = require('../../../Database/DB-driver-api');
const DB_driver=require('../../Database/DB-driver-api');

//const processrequest = require('../../Map/processRequest');
//creating routers
const router = express.Router({ mergeParams: true });


router.get('/trip', async (req, res)=>
 {
    if (req.driver == null) {
        return res.redirect('/driver/login');
    }
    const dv=await DB_driver.getAllInfoByID(req.driver.ID);
    const loc={
        lat:dv[0].LAT,
        lng:dv[0].LNG
    };
    console.log('sending location',loc);
    res.json(loc);
});


router.get('/all',async(req,res)=>
{
    const data = await DB_driver.getallDriverLocations();
    console.log("all driver loc=",data);
    res.json(data);



}
);





module.exports = router;