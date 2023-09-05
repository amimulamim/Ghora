//libraries
const express = require('express');
//const DB_trips = require('../../../Database/DB-driver-trips');
const { json } = require('body-parser');
//const DB_driver = require('../../../Database/DB-driver-api');
const DB_trips = require('../../Database/DB-trips-api');
const payment = require('../../Database/DB-payment-api');


//const processrequest = require('../../Map/processRequest');
//creating routers
const router = express.Router({ mergeParams: true });

router.post('/', async (req, res) => {
    if (req.driver == null) {
        return res.redirect('/driver/login');
    }
    const running = await DB_trips.runningOfDriver(req.driver.ID);
    if (running.length === 0) {
        return res.redirect('/driver');
    }
    else {
        await DB_trips.createTripHistory(running[0]);
        console.log('redirecting to complete');
        return res.redirect('/driver/completed');
    }


});


router.get('/', async (req, res) => {
    if (req.driver == null) {
        return res.redirect('/driver/login');
    }
    const completed = await DB_trips.completedTripDetailsofDriver(req.driver.ID);

    if (completed.length == 0) {
        console.log('nothing recently completed');
        res.redirect('/driver');
    }
    else {
        console.log('ready to render completed : ', completed[0]);
        console.log('trip history: ', completed[0]);
        const payment_details = await payment.getPaymentDetails(completed[0].TR_ID);
        console.log('payment details: ', payment_details[0]);
        res.render('driverLayout.ejs', {
            title: 'completed',
            page: ['driverCompleted'],
            trip_info: completed[0],
            driver: req.driver,
            payment: payment_details



        });

    }



}
);





module.exports = router;