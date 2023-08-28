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
    const reqexist=await DB_trips.getTripRequestsOfUser(req.user.USERNAME);
    
    const curr=await DB_trips.getTripRunningsOfUser(req.user.USERNAME);
    console.log("reqexist= " , reqexist);
    console.log("curr= " , curr);
    if(reqexist.length==0 && curr.length>0){
        res.send('accepted');
    }else{
        res.send('rejected');
    }

   
    //console.log(req.body.data);
    
    
});

module.exports = router;