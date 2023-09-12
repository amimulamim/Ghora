const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router({ mergeParams: true });
//my modules
const DB_user_edit = require('../../../Database/DB-user-edit-api');
const DB_auth_user = require('../../../Database/DB-user-auth-api');

const authUtils = require('../../../utils/auth-utils');

router.get('/', async (req, res) => {
    // check if already logged in
    if (req.user === null) {
        res.redirect('/user/login');
    }
    //console.log('etai user', req.user);
    let userInfo, errors = [];
    userInfo = await DB_auth_user.getLoginInfoByUsername(req.user.USERNAME);
    //console.log('eta', userInfo[0]);
    res.render('userlayout.ejs', {
        title: 'Edit Profile - Ghora',
        page: ['userPasswordEdit'],
        user: req.user,
        errors: errors,
        form: {
            prevpass: "",
            newpass: ""
            //sex:req.body.sex
        }
    });

});
router.post('/', async (req, res) => {
    if (req.user == null) {
        return res.redirect('/user/login');
    }

    console.log(req.body);
    let results, errors = [];
    results = await DB_auth_user.getLoginInfoByUsername(req.user.USERNAME);
    console.log('compare ' + results[0].PASSWORD);
    const match = await bcrypt.compare(req.body.prevpass, results[0].PASSWORD);
    let match2=false;
    if(req.body.prevpass===results[0].PASSWORD){
        match2 = true;
        console.log('onnovabe mile');
    }
    if (match) {
        if (req.body.newpass.length >= 6) {
            await bcrypt.hash(req.body.newpass, 8, async (err, hash) => {
                if (err)
                    console.log("ERROR at hashing password: " + err.message);
                else {

                    let p = hash;
                    let result = await DB_auth_user.changePassword(req.user.USERNAME, p);
                }
            });
            res.redirect('/user/info');
        }
        else {
            errors.push('Password Must Be At Least 6 Characters');
           
            res.render('userlayout.ejs', {
                title: 'Edit Profile - Ghora',
                page: ['userPasswordEdit'],
                user: req.user,
                errors: errors,
                form: {
                    prevpass: req.body.prevpass,
                    newpass: req.body.newpass
                    //sex:req.body.sex
                }
            });
        }
    }
   else if (match2) {
        if (req.body.newpass.length >= 6) {
            await bcrypt.hash(req.body.newpass, 8, async (err, hash) => {
                if (err)
                    console.log("ERROR at hashing password: " + err.message);
                else {

                    let p = hash;
                    let result = await DB_auth_user.changePassword(req.user.USERNAME, p);
                }
            });
            res.redirect('/user/info');
        }
        else {
            errors.push('Password Must Be At Least 6 Characters');
           
            res.render('userlayout.ejs', {
                title: 'Edit Profile - Ghora',
                page: ['userPasswordEdit'],
                user: req.user,
                errors: errors,
                form: {
                    prevpass: req.body.prevpass,
                    newpass: req.body.newpass
                    //sex:req.body.sex
                }
            });
        }
    }
    else {
        errors.push('wrong password');
        res.render('userlayout.ejs', {
            title: 'Edit Profile - Ghora',
            page: ['userPasswordEdit'],
            user: req.user,
            errors: errors,
            form: {
                prevpass: req.body.prevpass,
                newpass: req.body.newpass
                //sex:req.body.sex
            }
        });

    }
});

module.exports = router;