//libraries
const express = require('express');
//const DB_trips = require('../../../Database/DB-driver-trips');
const { json } = require('body-parser');
const DB_driver = require('../../Database/DB-driver-api');
const DB_trips=require('../../Database/DB-trips-api');
const payment=require('../../Database/DB-payment-api');
const address = require('../Map/formattedAddress');


//const processrequest = require('../../Map/processRequest');
//creating routers
const router = express.Router({ mergeParams: true });

// router.post('/',async(req,res)=>{
//     if (req.driver == null) {
//         return res.redirect('/driver/login');
//     }
//     const running = await DB_trips.runningOfDriver(req.driver.ID);
//     if(running.length===0){
//         res.redirect('/driver');
//     }
//     else{
//     await DB_trips.createTripHistory(running[0]);
//     console.log('redirecting to complete')
//     res.redirect('/driver/completed');

//    //res.render('driverLayout.ejs', {
//     // title:req.driver.NAME,
//     // page:['driverHome'],
//     // driver:req.driver

   

//     // });
//     }


// });


router.get('/',async(req,res)=>
{
    if (req.user == null) {
        return res.redirect('/user/login');
    }
    const completed=await DB_trips.completedTripDetailsofUser(req.user.USERNAME);

    if(completed.length == 0) {
        console.log('nothing recently completed');
        res.redirect('/driver');
    }
    else{
        console.log('ready to render completed : ',completed[0]);
        console.log('user history: ' , completed[0]);
        const payment_details=await payment.getPaymentDetails(completed[0].TR_ID);
        console.log('payment details: ' , payment_details[0]);
        let pickupaddress;
    await address.getPlaceName(completed[0].PLAT, completed[0].PLNG)
        .then(placeName => {
           // console.log('drop Place:', placeName);
            pickupaddress = placeName;
        })
        .catch(error => {
            console.error(error);
        });

    let dropoffaddress;
    await address.getPlaceName(completed[0].DLAT, completed[0].DLNG)
        .then(placeName => {
            //console.log('drop Place:', placeName);
            dropoffaddress = placeName;
        })
        .catch(error => {
            console.error(error);
        });

        const dv=await DB_driver.getDriverByPlate(completed[0].PLATE_NO);
        console.log('dv: ',dv[0]);



        res.render('userLayout.ejs',{
            title:'completed',
            page:['userCompleted'],
            trip_info:completed[0],
            user:req.user,
            payment:payment_details,
            pickup:pickupaddress,
            dropoff:dropoffaddress,
            driver_details:dv[0]



        });

    }



}
);





module.exports = router;