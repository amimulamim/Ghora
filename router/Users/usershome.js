// libraries
const express = require('express');
//const DB_admin_stats = require('../../Database/DB-admin-stats-api');
const DB_drivers=require('../../Database/DB-users-api');
//DB-users-api
// creating router

const router = express.Router({mergeParams : true});

//HOME page
router.get('/', async (req, res) =>{
    if( req.driver == null ){
        console.log('user nai');
        return res.redirect('/users/login');
    }
    let e_mail=req.users.EMAIL;
    console.log('tererere'+e_mail);
    //const driverInfo=await DB_drivers.getDriverByEmail(e_mail);
    //res.status(200).json(driverInfo.data);
    res.render('usersLayout.ejs', {
        title:'home',
        page:['usersHome'],

    });

});

module.exports = router;