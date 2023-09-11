const express = require('express');
//const DB_trips = require('../../../Database/DB-driver-trips');
const { json } = require('body-parser');
//const DB_driver = require('../../../Database/DB-driver-api');
// const DB_trips=require('../../Database/DB-trips-api');
// const payment=require('../../Database/DB-payment-api');
const payment=require('../../Database/DB-payment-api');

const router = express.Router({ mergeParams: true });



router.get('/', async (req, res) => {

    if(req.user==null){
        console.log('get e driver nai');
        return res.redirect('/user/login');
    }
 
   // const reqexist=await DB_trips.getTripRequestsOfUser(req.user.USERNAME);
    

    const mypayments=await payment.getPaymentsOfUser(req.user.USERNAME);

    


   res.render('userLayout.ejs', {
    user: req.user,
    page: ['userPayments'],
    title: req.user.NAME,
    payments: mypayments,
    navbar: 1
});

});

module.exports =router ;
