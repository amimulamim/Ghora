const router = require('express-promise-router')();


// passport jwt authentication
// const passport = require('passport');
// const passportConf = require('../passport');


// router.use('/*', (req,res,next)=>{
//     passport.authenticate('jwt',{failureFlash:true}, (err,user,info)=>{
//         if(err|| !user) return res.status(401).json({user});
//         next();
//     })(req,res,next);
// });

// DIVIDE THE ROUTES ACCORDING TO THE DATA
//router.use("/employee",require('./employee'));
//router.use("/job",require('./job'));

const DriverRouter=require('./driver');
const DriverAuthRouter=require('./auth/authentication');

router.get('/', async (req, res) =>{
    if( req.user == null )
        return res.redirect('/authentication');

   

    console.log('bbbbbbbbbbbb');
    res.render('layout.ejs', {
        user:req.user,
        body:['landingPage'],
        title:'Squirrel',
        publishers:["dfsdf","sfsdf","fsdfsd"],
        driver

    });

});



// setting up sub-routers
router.use("/driver",DriverRouter);
router.use("/driverauth",DriverAuthRouter);


module.exports = router;