// libraries
const express = require('express');
//const DB_admin_stats = require('../../Database/DB-admin-stats-api');
const DB_drivers=require('../../Database/DB-driver-api');

// creating router
const router = express.Router({mergeParams : true});
const map=require('../Map/liveloc');
const { json } = require('body-parser');
//HOME page
router.get('/', async (req, res) =>{
    if( req.driver == null ){
        console.log('driver nai');
        return res.redirect('/driver/login');
    }
    let e_mail=req.driver.EMAIL;
    console.log('tererere'+e_mail);
    //const driverInfo=await DB_drivers.getDriverByEmail(e_mail);
    //res.status(200).json(driverdInfo.data);
    // map.initMap();
    res.render('driverLayout.ejs', {
        title:req.driver.NAME,
        page:['driverHome'],
        driver:req.driver



    });

});

router.post('/',async(req,res) =>{
    if(req.driver===null){
        console.log('post e driver nai');
        return res.redirect('/driver/login');
    }
    
    
    console.log('liveloc theke aslam',req.body);
    const latitude=req.body.lat;
    const longitude=req.body.lng;

    



    console.log("lati,longi= ",latitude,' ',longitude);

    let dvloc={
        LATITUDE:latitude,
        LONGITUDE:longitude,
        DRIVER_ID:req.driver.ID
    }
     let updateloc=await DB_drivers.updateDriverLocation(dvloc);
     console.log("updateloc=",updateloc);
    // let madeRequest =await DB_trips.makeTripRequests(tripRequest);
    // let checkedRequest =await DB_trips.getAllInfoRequest(tripRequest);

    // if(checkedRequest[0]===undefined){
    //     console.log("ERROR at creating user request for trip");
    //     res.redirect('/user');
    // }
    // else{
    // //await authUtils.loginUser(res, result2[0].EMAIL)
    // // redirect to home page
    // //res.redirect(`/profile/${user.handle}/settings`);
    // console.log("successful request");
    // res.redirect('/user/');
    
    // }














//     let distbetween ;
//     let durationbetween;

//     mapCalc.calculateDistance(reqpickup, reqdropoff)
//   .then(result => {
//     // const { distance, duration } = result;
//     // console.log(`Distance: ${distance}`);
//     // console.log(`Duration: ${duration}`);
//     distbetween=result.distance;
//     durationbetween=result.duration;
//     console.log("distbetween=",distbetween);
//     console.log("durationbetween=",durationbetween);
//   })
//   .catch(error => {
//     console.error(error);
//   });


    



});





module.exports = router;