const express = require('express');
//const marked = require('marked');
const router = express.Router({ mergeParams: true });
const driverAuth=require('../middlewares/authmid').authDriver;
const userAuth=require('../middlewares/authmid').authUser;

router.get('/',async (req,res)=>{
  res.render('haha');

});
module.exports=router;