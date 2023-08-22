// libraries
const express = require('express');
//const DB_admin_stats = require('../../Database/DB-admin-stats-api');
const DB_users=require('../../Database/DB-user-api');

// creating router
const router = express.Router({mergeParams : true});

//HOME page
router.get('/', async (req, res) =>{
    if( req.user == null ){
        console.log('user nai');
        return res.redirect('/user/login');
    }
    let e_mail=req.user.EMAIL;
    console.log('tererere'+e_mail);
    const userInfo=await DB_users.getAllInfo(e_mail);
    //res.status(200).json(userInfo.data);
    res.render('userLayout.ejs', {
        title:req.user.NAME,
        page:['userHome'],
        user:req.user,
        info:userInfo

    });

});


module.exports = router;