//libraries
const express=require('express');
const DB_trips=require('../../../Database/DB-user-trips');
const { json } = require('body-parser');

//creating routers
const router=express.Router({mergeParams:true});

router.get('/',async(req,res) =>{
    if(req.users==null){
        return res.redirect('/user/login');
    }

    const requestsNearby=await DB_trips.makeTripRequests();
    //will do front end here . for now in json format
    console.log(json(requestsNearby.data));
    res.status(200).json(requestsNearby.data);
    // res.render('layout.ejs', {
    //     user:req.user,
    //     body:['bookPage'],
    //     title:'Books',
    //     navbar:1,
    //     book:booksResult[0],
    //     reviews:reviews,
    //     canReview:canReview,
    //     hasReviewd:hasReviewd,
    //     hasAddedWish:addedToWishList
    // });
});



module.exports = router ;