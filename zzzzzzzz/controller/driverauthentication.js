// libraries

const bcrypt = require('bcrypt');

// my modules
const Controller = require('./base').Controller;
const AuthRepo = require('../repository/authentication').AuthRepository;
const AuthUtils = require('../utils/authentication').AuthUtils;
const authRepo = new AuthRepo();
const authUtils = new AuthUtils();


class AuthController extends Controller {
    constructor() {
        super();
    }

    driverLoginGet = (req, res) => {
        // if not logged in take to login page
        if (req.user == null) {
            const errors = [];
            return res.render('layout.ejs', {
                title: 'Login - GHORA',
                body: ['login'],
                user: null,
                form: {
                    username: "",
                    password: ""
                },
                errors: errors
            })
        } else {
            res.redirect('/');
        }
    };

    driverLoginByEmail = async (req, res) => {
        // if not logged in take perform the post
        if (req.user == null) {
            let results, errors = [];
            // get login info for handle (id, handle, password)
            results = await authRepo.getLoginInfoByEmail(req.body.email);

            // if no result, there is no such user
            if (results.length == 0) {
                errors.push('No such user found');
            } else {
                // match passwords
                const match = await bcrypt.compare(req.body.password, results[0].PASSWORD);
                if (match) {
                    // if successful login the user
                    await authUtils.loginDriver(res, results[0].email);
                }
                else {
                    errors.push('wrong password');
                }
            }

            // if any error, redirect to login page but with form information, else redirect to homepage
            if (errors.length == 0) {
                res.redirect('/');
            } else {
                res.render('layout.ejs', {
                    title: 'Login - Ghora',
                    body: ['login'],
                    user: null,
                    errors: errors,
                    form: {
                        email: req.body.email,
                        password: req.body.password
                    }
                });
            }
        } else {
            //console.log(req.user);
            res.redirect('/');
        }
    };
};

exports.AuthController = AuthController;


