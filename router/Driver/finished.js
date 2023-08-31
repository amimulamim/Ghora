//libraries
const express = require('express');
//const DB_trips = require('../../../Database/DB-driver-trips');
const { json } = require('body-parser');
//const DB_driver = require('../../../Database/DB-driver-api');
const DB_trips=require('../../Database/DB-trips-api');
const DB_driver=require('../../Database/DB-driver-api');


//const processrequest = require('../../Map/processRequest');
//creating routers
const router = express.Router({ mergeParams: true });




router.get('/',async(req,res)=>
{
    if (req.driver == null) {
        return res.redirect('/driver/login');
    }
    const completed=await DB_trips.completedTripDetailsofDriver(req.driver.ID);

    if(completed.length == 0) {
        console.log('nothing recently completed');
        res.redirect('/driver');
    }
    else{
        console.log('ready to render finished : ',completed[0]);
        console.log('trip history: ' , completed[0]);
        
        res.render('driverLayout.ejs',{
            title:'completed',
            page:['driverCompleted'],
            trip_info:completed[0],
            driver:req.driver



        });

    }



}
);





module.exports = router;