// libraries
const express = require('express');
const bcrypt = require('bcrypt');

// my modules
const DB_user=require('../../../Database/DB-user-api');
const DB_wallet=require('../../../Database/DB-wallet-api');
//const DB_auth_user = require('../../../Database/DB-user-auth-api');
//const authUtils = require('../../../utils/auth-utils');

// creating router
const router = express.Router({mergeParams : true});

// ROUTE: login (get)
router.get('/', async (req, res) => {
    // if not logged in take to login page
    if(req.user == null){
       return res.redirect('/user/login');
    } else {
        let errors=[];
        console.log("wakkllet paisi ",req.user);
        const userwalletId=await DB_user.getWalletId(req.user.EMAIL);
        let walletInfo=[];
        if(userwalletId[0].WALLET_ID==null){
            errors.push("NO WALLET FOUND");
            // res.redirect('/user');
        }
        else{
            walletInfo=await DB_wallet.getWalletInfo(userwalletId[0].WALLET_ID);
            console.log(walletInfo[0].ACCOUNT_NO);
        }
        //console.log(userwalletId[0].WALLET_ID);
      
        res.render('userLayout.ejs',{
            errors:errors,
            user: req.user,
            page:['userWallet'],
            title:req.user.NAME,
            wallet:walletInfo,
            navbar:1
        });

    }
});



module.exports = router;