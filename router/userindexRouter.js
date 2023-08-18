// libraries
const express = require('express');
//const marked = require('marked');

const router = express.Router({mergeParams : true});
const usersAuth=require('../middlewares/authmid').authUser;
// sub-routers
const tripReqRouter=require('./User/TripRequests/userreq');
const loginRouter = require('./User/Auth/login');
const signupRouter=require('./User/Auth/signup');
const { sign } = require('jsonwebtoken');
// setting up sub-routers
router.use('/login', loginRouter);
router.use('/signup',signupRouter);


// ROUTE: home page
router.use(usersAuth);
router.get('/',require('./User/userHome'));

//setting up sub routers
router.use('/requests',tripReqRouter);

module.exports = router;