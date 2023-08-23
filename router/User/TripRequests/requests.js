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

    //const requestsNearby=await DB_trips.makeTripRequests();
    //will do front end here . for now in json format
   // console.log(json(requestsNearby.data));
    res.status(200).json(requestsNearby.data);
    const data = req.body.data;
  
    try {
      // Call a function from your database module to save the data
      //await database.saveData(data);
      console.log("data received= ",data);
  
      res.status(200).send("Data received at backend successfully");
    } catch (error) {
      console.error("Error receiving data:", error);
      res.status(500).send("An error occurred while receiving data");
    }
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