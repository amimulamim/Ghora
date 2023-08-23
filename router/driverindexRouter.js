// libraries
const express = require('express');
//const marked = require('marked');

const router = express.Router({mergeParams : true});
const driverAuth=require('../middlewares/authmid').authDriver;
// sub-routers
const driverInfoRouter=require('./Driver/Info/info');
const driverWalletRouter=require('./Driver/Wallet/wallet');
const tripReqRouter=require('./Driver/TripRequests/requests');
const loginRouter = require('./Driver/Auth/login');
const signupRouter=require('./Driver/Auth/signup');
const logoutRouter = require('./Driver/Auth/logout');
const editRouter=require('./Driver/Info/editinfo');
const dvhomeRouter=require('./Driver/driverhome');
// ROUTE: home page
//router.use(driverAuth);
router.get('/',dvhomeRouter);
router.get('/a',async(req,res)=>
{
    console.log(req.driver);
    res.send('hahahaha');

});

//setting up sub routers
router.use('/requests',tripReqRouter);
router.use('/login', loginRouter);
router.use('/signup',signupRouter);
router.use('/info',driverInfoRouter);
router.use('/wallet',driverWalletRouter);
router.use('/logout',logoutRouter);
router.use('/edit',editRouter);

module.exports = router;