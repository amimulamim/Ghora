const express = require('express');
//const DB_admin_stats = require('../../Database/DB-admin-stats-api');

const DB_trips=require('../../../Database/DB-user-trips');

// creating router
const router = express.Router({mergeParams : true});

//HOME page

router.get('/',async (req, res) => {
    if( req.user == null ){
        console.log('user nai');
        return res.redirect('/user/login');
    }
    let pendingreq=[];
    pendingreq=await DB_trips.getPendingRequests(req.user.USERNAME);
    //console.log("got pending to send to thread,length= ",pendingreq," ",pendingreq.length);
    if(pendingreq.length > 0){
        res.send('already');
    }
    else{
        res.send('not');
    }

});

module.exports = router;