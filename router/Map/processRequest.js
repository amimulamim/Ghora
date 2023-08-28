
//const express = require('express');
//const DB_trips = require('../../../Database/DB-driver-trips');
//const { json } = require('body-parser');
const address = require('../Map/formattedAddress');
const mapCalc = require('../Map/calculations');

async function processAllNearby(requestsNearby,mylocation){
    let allTrips= [];
//requestsNearby.forEach(async row => {
    for(var i=0;i<requestsNearby.length;i++){
        const row=requestsNearby[i];
    console.log("printing row by row");
    console.log(row.USERNAME);
    console.log(row.PLAT);
    console.log(row.PLNG);

    let distbetween;
    let durationbetween;
    const reqpickup = { lat: row.PLAT, lng: row.PLNG };
    const reqdropoff = { lat: row.DLAT, lng: row.DLNG };
   // const mylocation = { lat: req.driver.LAT, lng: req.driver.LNG };
    console.log("driver loc=", mylocation.lat, mylocation.lng);

 //  const coord=await mapCalc.calculateDistance(reqpickup,mylocation);
  // console.log("coord=", coord);

     await mapCalc.calculateDistance(reqpickup, mylocation)
        .then(result => {
            // const { distance, duration } = result;
            // console.log(`Distance: ${distance}`);
            // console.log(`Duration: ${duration}`);
            distbetween = result.distance;
            durationbetween = result.duration;
           
           //console.log("durationbetween=", parseFloat(durationbetween));
        })
        .catch(error => {
            console.error(error);
        });
        console.log("distbetween=", parseFloat(distbetween));
           console.log("duration between= ",parseFloat(durationbetween));
        if(parseFloat(distbetween) >2 || parseFloat(durationbetween)>15){
            console.log("discard it");
        }
        else{
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
    console.log("trip req obj =", nearbyReq);
    
}
  // console.log("all trips now =", allTrips);
}
//);
console.log("jaber boss");
return allTrips;
}

async function processOneReq(row){
    const reqpickup = { lat: row.PLAT, lng: row.PLNG };
    const reqdropoff = { lat: row.DLAT, lng: row.DLNG };

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

        const pending={
            USERNAME: row.USERNAME,
            PICK_UP: pickupaddress,
            DROP_OFF: dropoffaddress,
            V_TYPE:row.V_TYPE,
            ID: row.ID
        }
        return pending;

}

module.exports = {processAllNearby,
    processOneReq
}
;


