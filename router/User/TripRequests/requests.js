//libraries
const express=require('express');
const DB_trips=require('../../../Database/DB-user-trips');
const { json } = require('body-parser');
const   mapCalc=require('../../Map/calculations');

//creating routers
const router=express.Router({mergeParams:true});

router.get('/',async(req,res) =>{
    if(req.user==null){
        console.log('get e user nai');
        return res.redirect('/user/login');
    }
    console.log('get e user ase');

   
    console.log(req.body.data);
    
});
router.get('/current',async(req,res) =>{
    if(req.user==null){
        console.log('get e user nai');
        return res.redirect('/user/login');
    }
    console.log('get e user ase');

    
    console.log(req.body.data);
    
});

router.post('/',async(req,res) =>{
    if(req.user==null){
        console.log('post e user nai');
        return res.redirect('/user/login');
    }
    console.log('post e user ase',req.user.USERNAME);
    
    console.log('dir theke aslam',req.body);



    const origin=await fetch(req.body.origin);
    const json=await origin.json();
    console.log("origin=",json.results[0].geometry);

    const destination=await fetch(req.body.destination);
    const json2=await destination.json();
    console.log("destination=",json2.results[0].geometry);
    const reqpickup={
        lat:json.results[0].geometry.location.lat,
        lng:json.results[0].geometry.location.lng
    }
    const reqdropoff={
        lat:json2.results[0].geometry.location.lat,
        lng:json2.results[0].geometry.location.lng
    }
    console.log("pickup=",reqpickup);
    console.log("dropoff=",reqdropoff);

    const tripRequest={
        pickup:reqpickup,
        dropoff:reqdropoff,
        user:req.user
    }
    console.log('tripreq ready=',tripRequest);

    let madeRequest =await DB_trips.makeTripRequests(tripRequest);
    let checkedRequest =await DB_trips.getAllInfoRequest(tripRequest);

    if(checkedRequest[0]===undefined){
        console.log("ERROR at creating user request for trip");
        res.redirect('/user');
    }
    else{
    //await authUtils.loginUser(res, result2[0].EMAIL)
    // redirect to home page
    //res.redirect(`/profile/${user.handle}/settings`);
    console.log("successful request");
    res.redirect('/user/');
    
    }














    let distbetween ;
    let durationbetween;

    mapCalc.calculateDistance(reqpickup, reqdropoff)
  .then(result => {
    // const { distance, duration } = result;
    // console.log(`Distance: ${distance}`);
    // console.log(`Duration: ${duration}`);
    distbetween=result.distance;
    durationbetween=result.duration;
    console.log("distbetween=",distbetween);
    console.log("durationbetween=",durationbetween);
  })
  .catch(error => {
    console.error(error);
  });


    



});


// router.post("/", async (req, res) => {
//     const data = req.body.data;
  
//     try {
//       // Call a function from your database module to save the data
//       //await database.saveData(data);
//       console.log("data received= ",data);
  
//       res.status(200).send("Data received at backend");
//     } catch (error) {
//       console.error("Error receiving data:", error);
//       res.status(500).send("An error occurred while receiving data");
//     }
//   });



module.exports = router ;