// libraries
const express = require('express');
//const marked = require('marked');
const router = express.Router({ mergeParams: true });

// sub-routers
const driverRouter = require('./driverindexRouter');
const usersRouter=require('./userindexRouter');
// setting up sub-routers



router.get('/', async (req, res) => {
    res.render("initlayout");
});

//setting up sub routers
router.use('/driver',driverRouter);
router.use('/user',usersRouter)

module.exports = router;