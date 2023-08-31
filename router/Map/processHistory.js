
//const express = require('express');
//const DB_trips = require('../../../Database/DB-driver-trips');
//const { json } = require('body-parser');
const address = require('../Map/formattedAddress');
const mapCalc = require('../Map/calculations');
const review = require('../../Database/DB-review');
const payments = require('../../Database/DB-payment-api');


async function processAllHistory(requestsNearby){
    let allTrips= [];
//requestsNearby.forEach(async row => {
    for(var i=0;i<requestsNearby.length;i++){
        const row=requestsNearby[i];
    console.log("printing row by row");
    console.log(row.USERNAME);
    console.log(row.PLAT);
    console.log(row.PLNG);

    const tripprocess=await processOneTrip(row);
    allTrips.push(tripprocess);
    //console.log("trip req obj =", nearbyReq);
    
}
  // console.log("all trips now =", allTrips);

//);

return allTrips;
}

async function processOneTrip(row){
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

        const pay_info=await payments.getPaymentDetails(row.TR_ID);
        console.log('Payment Details of ',row.TR_ID,' ', pay_info);
        const rating = await review.getRatingOfTrip(row.TR_ID);
        console.log('payment rating length: ',pay_info.length, ' ',rating.length);

        if(pay_info.length>0) { 
            console.log('transaction no: ',pay_info[0].TRANSACTION_NO );
         } 
        const trip={
            TR_ID: row.TR_ID,
            USERNAME: row.USERNAME,
            PICK_UP: pickupaddress,
            DROP_OFF: dropoffaddress,
            START_TIME:row.START_TIME,
            FINISH_TIME: row.FINISH_TIME,
            PLATE_NO: row.PLATE_NO,
            FARE: row.FARE,
            PAYMENT:pay_info,
            REVIEW:rating
            
            
        }

        return trip;

}

module.exports = {processAllHistory,
    processOneTrip
}
;


