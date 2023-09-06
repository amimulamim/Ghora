const express = require('express');
//const DB_trips = require('../../../Database/DB-driver-trips');
const { json } = require('body-parser');
//const DB_driver = require('../../../Database/DB-driver-api');
// const DB_trips=require('../../Database/DB-trips-api');
// const payment=require('../../Database/DB-payment-api');
const review=require('../../Database/DB-review');

const router = express.Router({ mergeParams: true });



router.get('/', async (req, res) => {

    if(req.driver==null){
        console.log('get e driver nai');
        return res.redirect('/driver/login');
    }
 
   // const reqexist=await DB_trips.getTripRequestsOfUser(req.user.USERNAME);
    

   const allreviews=await review.getReviewsOfDriver(req.driver.ID);

    const counts=await review.getReviewCountsofDriver(req.driver.ID);
    const max_ratings=await review.getMaximumRatingofDriver(req.driver.ID);

   res.render('driverLayout.ejs', {
    driver: req.driver,
    page: ['driverRating'],
    title: req.driver.NAME,
    allreviews: allreviews,
    counts: counts,
    max_rating: max_ratings[0].MAX_RATING,
    navbar: 1
});






    



});

module.exports =router ;
