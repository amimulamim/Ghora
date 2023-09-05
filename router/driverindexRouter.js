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
const driverHistoryRouter=require('./Driver/TripRequests/triphistory');
const runningRouter = require('./Driver/runningTrip');
const completedRouter=require('./Driver/completed');
const alllocationsRouter=require('./Driver/alllocations.js');
const reviewRouter=require('./Driver/reviews');
const paymentsRouter=require('./Driver/payments.js');
//const finishedRouter = require('./Driver/finished');

// ROUTE: home page
//router.use(driverAuth);
router.get('/',dvhomeRouter);
router.post('/',dvhomeRouter);
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
router.use('/history',driverHistoryRouter);

router.use('/location',alllocationsRouter);
router.use('/accept',runningRouter);
router.use('/completed',completedRouter);
router.use('/reviews',reviewRouter);
router.use('/payments',paymentsRouter);
//route.use('/payments',paymentsRouter);
//router.use('/finished',finishedRouter);



//router.use('/routepath',routepathRouter);
// router.get('/accept/:id',async(req,res)=>{

//     res.send(req.params.id)
// });
//router.use('/running',runningRouter);

module.exports = router;