//libraries
const express = require('express');
const DB_trips = require('../../../Database/DB-driver-trips');
const { json } = require('body-parser');
const DB_driver = require('../../../Database/DB-driver-api');
const DB_model = require('../../../Database/DB-model-api');
const DB_avail = require('../../../Database/DB-availability');
const DB_running_trips= require('../../../Database/DB-trips-api');


const processrequest = require('../../Map/processRequest');
//creating routers
const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
    if (req.driver == null) {
        return res.redirect('/driver/login');
    }
    let errors=[];
    let currentrip;
    let driverInfo = [];
    let allTrips = [];
    const vtype=await DB_model.getVTypeByID(req.driver.ID);
    if(vtype[0].V_TYPE =='NO_DATA_FOUND' || vtype[0].V_TYPE =='OTHERS'){
        errors.push('You must have a valid vehicle to accept  rides');


    }
    else {
    const is_available=await DB_avail.is_available(req.driver.ID);
    if(is_available[0].IS_AVAILABLE==0){
        errors.push('You must be available to accept rides');
        const curr=await DB_running_trips.runningOfDriver(req.driver.ID);
        currentrip=curr[0];
        const path='/driver/accept/'+currentrip.TR_ID;
        console.log('path=',path);
        res.redirect(path);

    }
    else{
    //const requestsNearby = await DB_trips.getAllTripRequests();
    const requestsNearby = await DB_trips.getNearByTripRequestsOfDriver(req.driver.ID);
    console.log("req near=",requestsNearby);
    const mylocation = { lat: req.driver.LAT, lng: req.driver.LNG };
    console.log('req near=',requestsNearby);
     allTrips=await processrequest.processAllNearby(requestsNearby,mylocation);
     if(req.driver.WALLET_ID==null) {
        errors.push('Please add a WALLET_ID to receive payments');
     }

    // const json=await requestsNearby.json();
   // console.log("trip infos=");

    //let allTrips = [];

//    async function process(requestsNearby){ 
//     return new Promise((resolve) => {
//         setTimeout(()=>{
    






//     resolve(allTrips);
//     }, 1000);
// });
// }  

//const tripsall=await process(requestsNearby);

console.log("all trips  ,length=", allTrips,allTrips.length);
//console.log("trip req all =", tripsall);
    //});






    
    console.log("here driverReq e paisi " + req.driver.EMAIL);

    driverInfo = await DB_driver.getAllInfoByID(req.driver.ID);
     console.log(driverInfo[0].NAME);
    console.log("driver req er phone=", driverInfo[0].PHONE);
    }
    }
   // console.log("checking user ",allTrips[0].USERNAME);
    res.render('driverLayout.ejs', {
        driver: req.driver,
        page: ['driverRequest'],
        title: req.driver.NAME,
        info: driverInfo,
        allRequests: allTrips,
        navbar: 1,
        errors: errors
    });
});




module.exports = router;