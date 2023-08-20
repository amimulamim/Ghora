// libraries
const express = require('express');
//const marked = require('marked');

const router = express.Router({mergeParams : true});
const userAuth=require('../middlewares/authmid').authUser;
// sub-routers
const userInfoRouter=require('./User/Info/info');
const userWalletRouter=require('./User/Wallet/wallet');
const tripReqRouter=require('./User/TripRequests/requests');
const loginRouter = require('./User/Auth/login');
const signupRouter=require('./User/Auth/signup');
const logoutRouter = require('./User/Auth/logout');

// ROUTE: home page
//router.use(userAuth);
router.get('/',require('./User/userHome'));
router.get('/a',async(req,res)=>
{
    console.log(req.user);
    res.send('hahahaha');

});

//setting up sub routers
router.use('/requests',tripReqRouter);
router.use('/login', loginRouter);
router.use('/signup',signupRouter);
router.use('/info',userInfoRouter);
router.use('/wallet',userWalletRouter);
router.use('/logout',logoutRouter);
module.exports = router;