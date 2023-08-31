const express=require('express');
const DB_trips=require('../../Database/DB-trips-api');
const { json } = require('body-parser');
// const   mapCalc=require('../../Map/calculations');
// const address=require('../../Map/formattedAddress');
//const DB_users=require('../../Database/DB-user-api');
//creating routers
const router=express.Router({mergeParams:true});

router.get('/',async(req,res) =>{
    if(req.user==null){
        console.log(' trip_status e get e user nai');
        return res.redirect('/user/login');
    }
    console.log('get e user ase');
    const running=await DB_trips.runningOfUser(req.user.USERNAME);
    
    const comp=await DB_trips.unNotifiedCompletedTripofUser(req.user.USERNAME);
    console.log("running= " , running);
    console.log("comp= ,length =" , comp,comp.length);
    if(running.length==0 && comp.length>0){

        await DB_trips.makeNotifiedTripHistory(comp[0].TR_ID);
        console.log('notified completion doneeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',comp[0].TR_ID);
        res.send('completed');
    }
    else if(running.length>0 && comp.length==0){
        res.send('not yet');
    }
    else if(running.length==0 && comp.length==0){
        res.send('already done');
    }
    else{
        res.send('rejected');
    }

   
    //console.log(req.body.data);
    
    
});

module.exports = router;