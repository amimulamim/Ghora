// libraries
const express = require('express');
const bcrypt = require('bcrypt');

// my modules
const DB_user=require('../../../Database/DB-user-api');
const DB_wallet=require('../../../Database/DB-wallet-api');
const DB_auth_user = require('../../../Database/DB-user-auth-api');
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
        const userwalletId=await DB_user.getWalletId(req.user.USERNAME);
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

router.post('/', async (req, res) => {
    if (req.user == null) {
        return res.redirect('/user/login');
    }

    console.log(req.body);
    let results, errors = [];
    results = await DB_auth_user.getLoginInfoByUsername(req.user.USERNAME);
    console.log('compare ' + results[0].PASSWORD);
    const match = await bcrypt.compare(req.body.password, results[0].PASSWORD);
    if (!match) {
        const userWallet = await DB_user.getWalletId(req.user.USERNAME);
        const walletinfo = await DB_wallet.getWalletInfo(userWallet[0].WALLET_ID);

        await DB_wallet.addBalance(walletinfo[0].ID, req.body.amount);

        return res.redirect('/user/wallet');
    }
    else {
        errors.push('wrong password');
        res.render('userlayout.ejs', {
        
            page: ['userWallet'],
            driver: req.driver,
            errors: errors,
            title: req.driver.NAME,
            wallet: walletInfo,
            navbar: 1,
            form: {
                password: req.body.password,
                amount: req.body.amount
                //sex:req.body.sex
            }
        });

    }

});



module.exports = router;