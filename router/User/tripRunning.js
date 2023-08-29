const express=require('express');
const DB_trips=require('../../Database/DB-user-trips');
const { json } = require('body-parser');
// const   mapCalc=require('../../Map/calculations');
// const address=require('../../Map/formattedAddress');
//const DB_users=require('../../Database/DB-user-api');
//creating routers
const router=express.Router({mergeParams:true});

router.get('/',async(req,res) =>{
    if(req.user==null){
        console.log('get e user nai');
        return res.redirect('/user/login');
    }
    console.log('get e user ase');
   // const reqexist=await DB_trips.getTripRequestsOfUser(req.user.USERNAME);
    
    const curr=await DB_trips.getTripRunningsOfUser(req.user.USERNAME);
    

    res.render('userLayout.ejs',{
        user: req.user,
        page:['userRunning'],
        title:req.user.NAME,
        trip_info:curr[0],
        navbar:1
    });

   
    //console.log(req.body.data);
    
    
});

module.exports = router;