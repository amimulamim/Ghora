// libraries
const express = require('express');
const bcrypt = require('bcrypt');

// my modules
const DB_review = require('../../Database/DB-review');
//const authUtils = require('../../../utils/auth-utils');

// creating router
const router = express.Router({mergeParams : true});



router.post('/', async (req, res) => {
    // check if already logged in
    if(req.user == null){
        res.redirect('/user/login');
    }
    else{

        console.log('tr_id=',req.body.tr_id);
        console.log('rating=',req.body.rating);
        console.log('comment=',req.body.comment);
        const review={
            TR_ID:parseInt(req.body.tr_id),
            RATING:parseInt(req.body.rating),
            COMMENT:req.body.comment
        }
        console.log("review=",review);
        const obj={
        rating:parseFloat(review.RATING),
        comment:review.COMMENT,
        tid:parseInt(review.TR_ID)
        };
        console.log("obj=",obj);
        await DB_review.makeReview(review);
        res.redirect('/user');

    }
});

module.exports = router;