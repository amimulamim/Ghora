// libraries
const express = require('express');
//const marked = require('marked');

const router = express.Router({mergeParams : true});
const driverAuth=require('../middlewares/authmid').authDriver;
// sub-routers
const tripReqRouter=require('./Driver/TripRequests/requests');
const loginRouter = require('./Driver/Auth/login');
const signupRouter=require('./Driver/Auth/signup');
// setting up sub-routers
router.use('/login', loginRouter);
router.use('/signup',signupRouter);


// ROUTE: home page
router.use(driverAuth);
router.get('/',require('./Driver/driverHome'));

//setting up sub routers
router.use('/requests',tripReqRouter);

module.exports = router;