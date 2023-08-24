//libraries
const express = require('express');
const DB_trips = require('../../../Database/DB-driver-trips');
const { json } = require('body-parser');
const DB_driver = require('../../../Database/DB-driver-api');

const address = require('../../Map/formattedAddress');
const mapCalc = require('../../Map/calculations');
//creating routers
const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
    if (req.driver == null) {
        return res.redirect('/driver/login');
    }

    const requestsNearby = await DB_trips.getAllTripRequests();


    // const json=await requestsNearby.json();
    console.log("trip infos=");

    let allTrips = [];

//    async function process(requestsNearby){ 
//     return new Promise((resolve) => {
//         setTimeout(()=>{
    await requestsNearby.forEach(async row => {
        console.log("printing row by row");
        console.log(row.USERNAME);
        console.log(row.PLAT);
        console.log(row.PLNG);

        let distbetween;
        let durationbetween;
        const reqpickup = { lat: row.PLAT, lng: row.PLNG };
        const reqdropoff = { lat: row.DLAT, lng: row.DLNG };
        const mylocation = { lat: req.driver.LAT, lng: req.driver.LNG };
       // console.log("driver loc=", mylocation.lat, mylocation.lng);

       const coord=await mapCalc.calculateDistance(reqpickup,mylocation);
       console.log("coord=", coord);

         await mapCalc.calculateDistance(reqpickup, mylocation)
            .then(result => {
                // const { distance, duration } = result;
                // console.log(`Distance: ${distance}`);
                // console.log(`Duration: ${duration}`);
                distbetween = result.distance;
                durationbetween = result.duration;
               // console.log("distbetween=", distbetween);
               // console.log("durationbetween=", durationbetween);
            })
            .catch(error => {
                console.error(error);
            });

        let pickupaddress;
        await address.getPlaceName(reqpickup.lat, reqpickup.lng)
            .then(placeName => {
               // console.log('drop Place:', placeName);
                pickupaddress = placeName;
            })
            .catch(error => {
                console.error(error);
            });

        let dropoffaddress;
        await address.getPlaceName(reqdropoff.lat, reqdropoff.lng)
            .then(placeName => {
                //console.log('drop Place:', placeName);
                dropoffaddress = placeName;
            })
            .catch(error => {
                console.error(error);
            });
        const nearbyReq = {
            USERNAME: row.USERNAME,
            PICK_UP: pickupaddress,
            DROP_OFF: dropoffaddress,
            DISTANCE: distbetween,
            DURATION: durationbetween,
            ID: row.ID



        }
        allTrips.push(nearbyReq);
        //console.log("trip req obj =", nearbyReq);
      // console.log("all trips now =", allTrips);
    }
    );
//     resolve(allTrips);
//     }, 1000);
// });
// }  

//const tripsall=await process(requestsNearby);

console.log("all trips  ,length=", allTrips,allTrips.length);
//console.log("trip req all =", tripsall);
    //});






    let driverInfo = [];
    console.log("here driverReq e paisi " + req.driver.EMAIL);

    driverInfo = await DB_driver.getAllInfo(req.driver.EMAIL);
     console.log(driverInfo[0].NAME);
    console.log("driver req er phone=", driverInfo[0].PHONE);
   // console.log("checking user ",allTrips[0].USERNAME);
    res.render('driverLayout.ejs', {
        driver: req.driver,
        page: ['driverRequest'],
        title: req.driver.NAME,
        info: driverInfo,
        allRequests: allTrips,
        navbar: 1
    });
});


// router.post('/', async (req, res) => {
//     if (req.driver == null) {
//         return res.redirect('/driver/login');
//     }

//     const requestsNearby = await DB_trips.getAllTripRequests();
//     const json = await origin.json();
//     console.log("trip infos=", json.results[0]);

//     requestsNearby.forEach(row => {
//         console.log("printing row by row");
//         console.log(row.USERNAME);
//         console.log(row.PLAT);
//         console.log(row.PLNG);
//     });
//     //will do front end here . for now in json format
//     console.log("driver dekhtece ", requestsNearby[0].USERNAME);
//     //res.status(200).json(requestsNearby.data);

//     let driverInfo = [];
//     console.log("here driverReq e paisi " + req.driver.EMAIL);

//     driverInfo = await DB_driver.getAllInfo(req.driver.EMAIL);
//     console.log(driverInfo[0].NAME);
//     console.log("driver req er phone=", driverInfo[0].PHONE);
//     res.render('driverLayout.ejs', {
//         driver: req.driver,
//         page: ['driverRequest'],
//         title: req.driver.NAME,
//         info: driverInfo,
//         tripInfo: requestsNearby,
//         navbar: 1
//     });
// });


module.exports = router;