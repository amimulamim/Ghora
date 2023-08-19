// libraries
const jwt = require('jsonwebtoken');

// my modules
const DB_auth_driver = require('../Database/DB-driver-auth-api');
const DB_auth_user = require('../Database/DB-user-auth-api');

function authUser(req, res, next){
    req.user = null;
    // check if user has cookie token
    if(req.cookies.sessionToken){
        let token = req.cookies.sessionToken;
        // verify token was made by server
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) =>{
            if(err){
                console.log("ERROR at verifying token: " + err.message);
                next();
            } else {
                // get user prompt (id, handle, message count) from id
                const decodedEmail = decoded.email;
                let results = await DB_auth_user.getLoginInfoByEmail(decodedEmail);

                // if no such user or token doesn't match, do nothing
               if(results.length == 0){
                    //console.log('auth: invalid cookie');
                }/* else if(results[0].LOGIN_TOKEN != token){
                    //console.log('auth: invalid token');
                } */else{
                    // set prompt in reqest object
                    let time = new Date();
                  //  await DB_auth.updateLoginTimeById(decodedId, time);

                    req.user = {
                        USERNAME:results[0].USERNAME,
                        EMAIL: decodedEmail,
                        NAME: results[0].NAME,
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

function authDriver(req, res, next){
    req.driver = null;
    // check if user has cookie token
    if(req.cookies.driverSessionToken){
        let token = req.cookies.driverSessionToken;
        // verify token was made by server
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) =>{
            if(err){
                console.log("ERROR at verifying token: " + err.message);
                next();
            } else {
                // get user prompt (id, handle, message count) from id
                const decodedEmail = decoded.superEmail;
                let results = await DB_auth_driver.getLoginInfoByEmail(decodedEmail);
               // console.log(decodedEmail);
                // if no such user or token doesn't match, do nothing
               if(results.length == 0){
                    console.log('auth: invalid cookie');
                }/* else if(results[0].LOGIN_TOKEN != token){
                    //console.log('auth: invalid token');
                } */else{
                    // set prompt in reqest object
                    let time = new Date();
                  //  await DB_auth.updateLoginTimeById(decodedId, time);
                    console.log('peye gesi');
                    req.driver = {
                        ID:results[0].ID,
                        EMAIL: decodedEmail,
                        NAME: results[0].NAME,
                        PHONE:results[0].PHONE
                        //IMAGE:results[0].IMAGE
                    }
                }
                next();
            }
        });
    } else {
        console.log('kamne');
        next();
    }   
}

module.exports = {
    authDriver,
    authUser
};