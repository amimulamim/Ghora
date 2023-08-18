// libraries
const express = require('express');
//const marked = require('marked');

const router = express.Router({mergeParams : true});
const usersAuth=require('../middlewares/authmid').authUser;
// sub-routers
const tripReqRouter=require('./Users/TripRequests/userreq');

const loginRouter = require('./Users/Auth/login');
// setting up sub-routers
router.use('/login', loginRouter);


// ROUTE: home page
router.use(usersAuth);
router.get('/',require('./Users/usersHome'));

//setting up sub routers
router.use('/requests',tripReqRouter);

module.exports = router;