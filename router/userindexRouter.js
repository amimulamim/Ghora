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
const reqstatusRouter=require('./User/TripRequests/reqstatus.js');
const runningRouter = require('./User/tripRunning.js');
const userHistoryRouter=require('./User/TripRequests/triphistory');
const cancelRouter=require('./User/TripRequests/cancel');
const tripStatusRouter=require('./User/tripStatus');
const completedRouter = require('./User/completed');
const reviewRouter = require('./User/review');
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
router.use('/request_status', reqstatusRouter);
router.use('/running', runningRouter);
router.use('/history',userHistoryRouter);
router.use('/cancel',cancelRouter);
router.use('/user/trip_status',tripStatusRouter);
router.use('/completed',completedRouter);
router.use('/review',reviewRouter);
// async (req,res) => {
//     //
//     res.send('accepted')
// })
//router.use('/riderequest',require('./User/userHome'));
module.exports = router;