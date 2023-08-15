// libraries
const express = require('express');
//const marked = require('marked');

const router = express.Router({mergeParams : true});
const driverAuth=require('../middlewares/authmid').authDriver;
// sub-routers
const tripReqRouter=require('./Driver/TripRequests/requests');
const loginRouter = require('./Driver/Auth/login');
// setting up sub-routers
router.use('/login', loginRouter);


// ROUTE: home page
router.use(driverAuth);
router.get('/',require('./Driver/driverhome'));

//setting up sub routers
router.use('/requests',tripReqRouter);

module.exports = router;