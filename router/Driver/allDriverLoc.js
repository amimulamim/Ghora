const express = require('express');
//const DB_trips = require('../../../Database/DB-driver-trips');
const { json } = require('body-parser');
//const DB_driver = require('../../../Database/DB-driver-api');
//const DB_trips=require('../../Database/DB-trips-api');
const DB_driver=require('../../Database/DB-driver-api');


//const processrequest = require('../../Map/processRequest');
//creating routers
const router = express.Router({ mergeParams: true });


router.get('/', async (req, res) => {

    
    
   // const reqexist=await DB_trips.getTripRequestsOfUser(req.user.USERNAME);
    
    const locs=await DB_driver.getallDriverLocations();
    // if(curr.length>0){
    //     res.redirect('/user');
    // }
    console.log('all driver loccccccccccccccccccccccccccccccc= ',locs);
    const locsdata={
        locArray:locs
    }
    res.json(locsdata);
//res.send(str);
    
}


);

module.exports=router;