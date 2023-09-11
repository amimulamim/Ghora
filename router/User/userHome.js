// libraries
const express = require('express');
//const DB_admin_stats = require('../../Database/DB-admin-stats-api');
const DB_users=require('../../Database/DB-user-api');
const DB_trips=require('../../Database/DB-user-trips');
const DB_running_trips = require('../../Database/DB-trips-api');
const Map=require('../Map/processRequest');

// creating router
const router = express.Router({mergeParams : true});

//HOME page

router.get('/already',async (req, res) => {
    if( req.user == null ){
        console.log('user nai');
        return res.redirect('/user/login');
    }
    let pendingreq=[];
    pendingreq=await DB_trips.getPendingRequests(req.user.USERNAME);
   // console.log("got pending to send to thread,length= ",pendingreq," ",pendingreq.length);
    if(pendingreq.length > 0){
        res.send('already');
    }
    else{
        res.send('not');
    }

});

router.get('/', async (req, res) =>{
    if( req.user == null ){
        console.log('user nai');
        return res.redirect('/user/login');
    }
    let e_mail=req.user.EMAIL;
    console.log('tererere'+e_mail);
    const userInfo=await DB_users.getAllInfoByUsername(req.user.USERNAME);
    //res.status(200).json(userInfo.data);
    const pendingreq=await DB_trips.getPendingRequests(req.user.USERNAME);
    const currunning=await DB_running_trips.runningOfUser(req.user.USERNAME);

    let cur_req=0;
     let pendingRequest;
     let runningtrip;
    
    if(currunning.length>0){
        console.log("already in a trip");
        res.redirect("/user/running");
    }
    else{
    if(pendingreq.length>0){
        cur_req=pendingreq[0];
      //  console.log("got pending id= ",cur_req);
        pendingRequest=await Map.processOneReq(pendingreq[0]);
    }
    
    else{
        pendingRequest={
            USERNAME: req.user.USERNAME,
            PICK_UP: "",
            DROP_OFF: "",
            V_TYPE:"",
            ID: 0
        }
    }

        
   // console.log("got pendingRequest = ",pendingRequest.PICK_UP,pendingRequest.DROP_OFF,pendingRequest.V_TYPE);
    console.log('pendinf id= ',pendingRequest.ID);
    const oldPending=await DB_trips.getOldPendingRequests(req.user.USERNAME);
    await DB_trips.deleteOldPendingRequests(req.user.USERNAME);
    
    res.render('userLayout.ejs', {
        title:req.user.NAME,
        page:['userHome'],
        user:req.user,
        info:userInfo,
        pending:pendingRequest,
        running:runningtrip,
        oldPending:oldPending

    });
}

});



  

module.exports = router;