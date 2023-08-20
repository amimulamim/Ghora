// libraries
const express = require('express');
//const marked = require('marked');
const router = express.Router({ mergeParams: true });

// sub-routers
const driverAuth=require('../middlewares/authmid').authDriver;
const userAuth=require('../middlewares/authmid').authUser;
const driverRouter = require('./driverindexRouter');
const usersRouter=require('./userindexRouter');
// setting up sub-routers
router.use(userAuth);
router.use(driverAuth);


router.get('/', async (req, res) => {
    res.render("initlayout");
});

//setting up sub routers

router.use('/driver',driverRouter);
router.use('/user',usersRouter)

module.exports = router;