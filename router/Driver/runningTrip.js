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



router.get('/:tid', async (req, res) => {
    if (req.driver == null) {
        return res.redirect('/driver/login');
    }

    //const d_id=req.driver.ID;
   // console.log("d_id=",d_id);


    
    const tid=req.params.tid;
    console.log("tid= ",tid)
    const trip_id=parseInt(tid);
    console.log("trip_id accepted=",trip_id);
    // router.get('/accept/:id',async(req,res)=>{

      // res.status(202).send(req.params.id);
      const d_id=req.driver.ID;
   console.log("d_id=",d_id);
    if(!(typeof trip_id==='number' && !isNaN(trip_id) ))
    {
        console.log("trip_id not a number")
        res.redirect('/driver');
    }

// });
    const tripreq=await DB_trips.tripReqDetails(trip_id);
    if(tripreq.length > 0){
        console.log("details accepted=",tripreq);
        try{

                        console.log("tripreq checking ,d_id=",tripreq[0],' ',req.driver.ID);
                        console.log('trip id=',tripreq[0].TR_ID);
            const already=await DB_trips.runningTripDetails(tripreq[0].TR_ID);

            console.log("already=",already);
            if(already.length == 0){
                console.log("already not found");
            await DB_trips.createRunningTrip(tripreq[0],req.driver.ID);
            console.log("create done for d_id=",req.driver.ID);
            await DB_trips.deleteReq(tripreq[0].TR_ID);
            console.log("delete done");
            console.log("create ,del done");
            }
        
            console.log("ready to render");
        
            res.render('driverLayout.ejs', {
                        driver: req.driver,
                        page: ['driverRunning'],
                        title: req.driver.NAME,
                        trip_info:tripreq[0],
                        navbar: 1
                    });
        
        
        
            }
            catch(err){
                console.log("creating err=",err);
                res.redirect('/driver');
            }
        
    }
    else
    {   
       // console.log("tripreq checking ,d_id=",tripreq[0],' ',req.driver.ID);
              //          console.log('trip id=',tripreq[0].ID);
            const already=await DB_trips.runningTripDetails(trip_id);
            if(already.length>0){
            console.log("already=",already);
            
        
            console.log("ready to render");
        
            res.render('driverLayout.ejs', {
                        driver: req.driver,
                        page: ['driverRunning'],
                        title: req.driver.NAME,
                        trip_info:already[0],
                        navbar: 1
                    });

                }
                else{
                    console.log("already not found");
                    res.redirect('/driver/requests');
                }








    }
    






//     const requestsNearby = await DB_trips.getAllTripRequests();
//     const mylocation = { lat: req.driver.LAT, lng: req.driver.LNG };
//     console.log('req near=',requestsNearby);
//     const allTrips=await processrequest.processAllNearby(requestsNearby,mylocation);


// console.log("all trips  ,length=", allTrips,allTrips.length);
// //console.log("trip req all =", tripsall);
//     //});






//     let driverInfo = [];
//     console.log("here driverReq e paisi " + req.driver.EMAIL);

//     driverInfo = await DB_driver.getAllInfo(req.driver.EMAIL);
//      console.log(driverInfo[0].NAME);
//     console.log("driver req er phone=", driverInfo[0].PHONE);
//    // console.log("checking user ",allTrips[0].USERNAME);
//     res.render('driverLayout.ejs', {
//         driver: req.driver,
//         page: ['driverRequest'],
//         title: req.driver.NAME,
//         info: driverInfo,
//         allRequests: allTrips,
//         navbar: 1
//     });
});






module.exports = router;