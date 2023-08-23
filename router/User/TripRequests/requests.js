//libraries
const express=require('express');
const DB_trips=require('../../../Database/DB-user-trips');
const { json } = require('body-parser');
//const dir=require('../../../public/dir')

//creating routers
const router=express.Router({mergeParams:true});

router.get('/',async(req,res) =>{
    if(req.user==null){
        console.log('get e user nai');
        return res.redirect('/user/login');
    }
    console.log('get e user ase');

    // const requestsNearby=await DB_trips.makeTripRequests();
    // //will do front end here . for now in json format
    // console.log(json(requestsNearby.data));
    // res.status(200).json(requestsNearby.data);
    console.log(req.body.data);
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
router.get('/current',async(req,res) =>{
    if(req.user==null){
        console.log('get e user nai');
        return res.redirect('/user/login');
    }
    console.log('get e user ase');

    // const requestsNearby=await DB_trips.makeTripRequests();
    // //will do front end here . for now in json format
    // console.log(json(requestsNearby.data));
    // res.status(200).json(requestsNearby.data);
    console.log(req.body.data);
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

router.post('/',async(req,res) =>{
    if(req.user==null){
        console.log('post e user nai');
        return res.redirect('/user/login');
    }
    console.log('post e user ase');
    
    console.log('dir theke aslam',req.body);


    const origin=await fetch(req.body.origin);
    const json=await origin.json();
    console.log(json.results[0].geometry);

    // const sendresponse = await fetch("/user/requests", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: req_data,
    //   });


    // const requestsNearby=await DB_trips.makeTripRequests();
    // //will do front end here . for now in json format
    // console.log(json(requestsNearby.data));
    // res.status(200).json(requestsNearby.data);
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


router.post("/", async (req, res) => {
    const data = req.body.data;
  
    try {
      // Call a function from your database module to save the data
      //await database.saveData(data);
      console.log("data received= ",data);
  
      res.status(200).send("Data received at backend");
    } catch (error) {
      console.error("Error receiving data:", error);
      res.status(500).send("An error occurred while receiving data");
    }
  });



module.exports = router ;