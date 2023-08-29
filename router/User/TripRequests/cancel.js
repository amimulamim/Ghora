//libraries
const express=require('express');
const DB_trips=require('../../../Database/DB-user-trips');
const { json } = require('body-parser');
const   mapCalc=require('../../Map/calculations');
const address=require('../../Map/formattedAddress');
//const DB_users=require('../../Database/DB-user-api');
//creating routers
const router=express.Router({mergeParams:true});

router.get('/',async(req,res) =>{
    if(req.user==null){
        console.log('get e user nai');
        return res.redirect('/user/login');
    }
    console.log('get e user ase');

    await DB_trips.cancelRequest(req.user.USERNAME);

   
    //console.log(req.body.data);
    res.redirect('/user');
    
});


router.post('/',async(req,res) =>{
    if(req.user==null){
        console.log('post e user nai');
        return res.redirect('/user/login');
    }
    console.log('post e user ase',req.user.USERNAME);
    
    await DB_trips.cancelRequest(req.user.USERNAME);

    res.redirect('/user');
    
    }



);


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