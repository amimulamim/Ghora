const express = require('express');
//const DB_trips = require('../../../Database/DB-driver-trips');
const { json } = require('body-parser');
//const DB_driver = require('../../../Database/DB-driver-api');
// const DB_trips=require('../../Database/DB-trips-api');
// const payment=require('../../Database/DB-payment-api');
const payment=require('../../Database/DB-payment-api');

const router = express.Router({ mergeParams: true });



router.get('/', async (req, res) => {

    if(req.driver==null){
        console.log('get e driver nai');
        return res.redirect('/driver/login');
    }
 
   // const reqexist=await DB_trips.getTripRequestsOfUser(req.user.USERNAME);
    

    const mypayments=await payment.getPaymentsOfDriver(req.driver.ID);

    


   res.render('driverLayout.ejs', {
    driver: req.driver,
    page: ['driverPayments'],
    title: req.driver.NAME,
    payments: mypayments,
    navbar: 1
});






    



});

module.exports =router ;
