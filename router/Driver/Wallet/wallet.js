// libraries
const express = require('express');
const bcrypt = require('bcrypt');

// my modules
const DB_driver = require('../../../Database/DB-driver-api');
const DB_wallet = require('../../../Database/DB-wallet-api');
const DB_auth_driver = require('../../../Database/DB-driver-auth-api');
//const authUtils = require('../../../utils/auth-utils');

// creating router
const router = express.Router({ mergeParams: true });

// ROUTE: login (get)
router.get('/', async (req, res) => {
    // if not logged in take to login page
    if (req.driver == null) {
        return res.redirect('/driver/login');
    } else {
        let errors = [];
        console.log("wakkllet paisi ", req.driver);
        const driverwalletId = await DB_driver.getWalletIdByID(req.driver.ID);
        let walletInfo = [];
        if (driverwalletId[0].WALLET_ID == null) {
            errors.push("NO WALLET FOUND");
            // res.redirect('/driver');
        }
        else {
            walletInfo = await DB_wallet.getWalletInfo(driverwalletId[0].WALLET_ID);
            console.log(walletInfo[0].ACCOUNT_NO);
        }
        //console.log(driverwalletId[0].WALLET_ID);

        res.render('driverLayout.ejs', {
            errors: errors,
            driver: req.driver,
            page: ['driverWallet'],
            title: req.driver.NAME,
            wallet: walletInfo,
            navbar: 1
        });

    }
});

router.post('/', async (req, res) => {
    if (req.driver == null) {
        return res.redirect('/driver/login');
    }

    console.log(req.body);
    let results, errors = [];
    results = await DB_auth_driver.getLoginInfoByID(req.driver.ID);
    const driverWallet = await DB_driver.getWalletIdByID(req.driver.ID);
    const walletinfo = await DB_wallet.getWalletInfo(driverWallet[0].WALLET_ID);
        console.log('walllllllllllllllllll',walletinfo);
   
    
    if (walletinfo.length>0 && req.body.password==walletinfo[0].PASSWORD) {
        
        await DB_wallet.addBalance(walletinfo[0].ID, req.body.amount);
        return res.redirect('/driver/wallet');
    }
    else {
        errors.push('wrong credentials');
        res.render('driverlayout.ejs', {
            title: 'Edit Profile - Ghora',
            page: ['driverWallet'],
            driver: req.driver,
            errors: errors,
            title: req.driver.NAME,
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