// libraries
const jwt = require('jsonwebtoken');

// my modules
const AuthRepo = require('../repository/authentication').AuthRepository;
const authRepo=new AuthRepo();


class AuthMiddle {
    constructor() {
    }

    authDriver = function (req, res, next) {
        req.user = null;
        // check if user has cookie token
        if (req.cookies.sessionToken) {
            let token = req.cookies.sessionToken;
            // verify token was made by server
            jwt.verify(token, process.env.APP_SECRET, async (err, decoded) => {
                if (err) {
                    console.log("ERROR at verifying token: " + err.message);
                    next();
                } else {
                    // get user prompt (id, handle, message count) from id
                    const decodedemail = decoded.email;
                    let results = await authRepo.getLoginInfoByEmail(email);

                    // if no such user or token doesn't match, do nothing
                    if (results.length == 0) {
                        //console.log('auth: invalid cookie');
                    }/* else if(results[0].LOGIN_TOKEN != token){
                    //console.log('auth: invalid token');
                } */else {
                        // set prompt in reqest object
                        let time = new Date();
                        //  await AuthRepo.updateLoginTimeById(email, time);

                        req.user = {
                            ID:results[0].ID,
                            EMAIL: email,
                            NAME: results[0].NAME
                            //IMAGE:results[0].IMAGE
                        }
                    }
                    next();
                }
            });
        } else {
            next();
        }
    }

};

exports.AuthMiddle = AuthMiddle;