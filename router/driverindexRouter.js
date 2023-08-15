// libraries
const express = require('express');
//const marked = require('marked');

const router = express.Router({mergeParams : true});
const driverAuth=require('../middlewares/authmid').authDriver;
// sub-routers

const loginRouter = require('./Driver/Auth/login');
// setting up sub-routers
router.use('/login', loginRouter);

// ROUTE: home page
router.get('/',require('./Driver/driverhome'));
router.use(driverAuth);
module.exports = router;