const express=require('express');
const DB_trips=require('../../Database/DB-user-trips');
const { json } = require('body-parser');
// const   mapCalc=require('../../Map/calculations');
// const address=require('../../Map/formattedAddress');
//const DB_users=require('../../Database/DB-user-api');
//creating routers
const router=express.Router({mergeParams:true});
const address=require('../Map/formattedAddress');
const DB_driver=require('../../Database/DB-driver-api');
const DB_model=require('../../Database/DB-model-api');


router.get('/',async(req,res) =>{
    if(req.user==null){
        console.log('get e user nai');
        return res.redirect('/user/login');
    }
    console.log('get e user ase');
   // const reqexist=await DB_trips.getTripRequestsOfUser(req.user.USERNAME);
    
    const curr=await DB_trips.getTripRunningsOfUser(req.user.USERNAME);
    console.log("got cur trip",curr[0]);
    
    let pickupaddress;
    await address.getPlaceName(curr[0].PLAT, curr[0].PLNG)
        .then(placeName => {
           // console.log('drop Place:', placeName);
            pickupaddress = placeName;
        })
        .catch(error => {
            console.error(error);
        });

    let dropoffaddress;
    await address.getPlaceName(curr[0].DLAT, curr[0].DLNG)
        .then(placeName => {
            //console.log('drop Place:', placeName);
            dropoffaddress = placeName;
        })
        .catch(error => {
            console.error(error);
        });

        const drv=await DB_driver.getAllInfoByID(curr[0].D_ID);
        console.log("accepted driver info=",drv);
        const V_DETAILS=await DB_model.vehicle_details(drv[0].PLATE_NO);

        const trip_running={
            PICK_UP:pickupaddress,
            DROP_OFF:dropoffaddress,
            USERNAME:curr[0].USERNAME,
            TR_ID:curr[0].TR_ID,
            PLAT:curr[0].PLAT,
            PLNG:curr[0].PLNG,
            DLAT:curr[0].DLAT,
            DLONG:curr[0].DLNG,
            DRIVER:drv[0],
            V_DETAILS:V_DETAILS[0],
            TIME_REQUEST:curr[0].TIME_REQUEST

        }

    res.render('userLayout.ejs',{
        user: req.user,
        page:['userRunning'],
        title:req.user.NAME,
        trip_info:trip_running,
        navbar:1
    });

   
    //console.log(req.body.data);
    
    
});

module.exports = router;