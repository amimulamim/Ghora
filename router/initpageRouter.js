// libraries
const express = require('express');
//const marked = require('marked');
const router = express.Router({ mergeParams: true });

// sub-routers
const driverRouter = require('./driverindexRouter');
const usersRouter=require('./usersindexRouter');
// setting up sub-routers



router.get('/', async (req, res) => {
    res.render("initlayout");
});

//setting up sub routers
router.use('/driver',driverRouter);
router.use('/users',usersRouter)

module.exports = router;