// libraries
const jwt = require('jsonwebtoken');

// my modules
const DB_auth_driver = require('../Database/DB-driver-auth-api');
const DB_auth_user = require('../Database/DB-user-auth-api');

function authUser(req, res, next){
    req.user = null;
    // check if user has cookie token
    if(req.cookies.userSessionToken){
        let token = req.cookies.userSessionToken;
        // verify token was made by server
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) =>{
            if(err){
                console.log("ERROR at verifying token: " + err.message);
                next();
            } else {
                // get user prompt (id, handle, message count) from id
                const decodedUsername = decoded.superUsername;
                let results = [];
                results = await DB_auth_user.getLoginInfoByUsername(decodedUsername);

                // if no such user or token doesn't match, do nothing
               if( results==undefined || results.length==0 ){
                    console.log('auth: invalid cookie');
                }/* else if(results[0].LOGIN_TOKEN != token){
                    //console.log('auth: invalid token');
                } */else{
                    // set prompt in reqest object
                    let time = new Date();
                  //  await DB_auth.updateLoginTimeById(decodedId, time);

                    req.user = {
                        USERNAME:decodedUsername,
                        EMAIL: results[0].EMAIL,
                        NAME: results[0].NAME,
                        PHONE:results[0].PHONE,
                        WALLET_ID:results[0].WALLET_ID

                        //IMAGE:results[0].IMAGE
                    }
                    console.log('auth hocche ',req.user)
                }
                next();
            }
        });
    } else {
        console.log('kamne user');
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
                const decodedID = decoded.superID;
                let results=[];
                
                 results = await DB_auth_driver.getLoginInfoByID(decodedID);
               // console.log(decodedEmail);
                // if no such user or token doesn't match, do nothing
               if( results==undefined || results.length==0){
                    console.log('auth: invalid cookie');
                }/* else if(results[0].LOGIN_TOKEN != token){
                    //console.log('auth: invalid token');
                } */else{
                    // set prompt in reqest object
                    let time = new Date();
                  //  await DB_auth.updateLoginTimeById(decodedId, time);
                    console.log('peye gesi');
                    req.driver = {
                        ID:decodedID,
                        EMAIL: results[0].EMAIL,
                        NAME: results[0].NAME,
                        PHONE:results[0].PHONE,
                        WALLET_ID:results[0].WALLET_ID,
                        LAT:results[0].LAT,
                        LNG:results[0].LNG
                        //IMAGE:results[0].IMAGE
                    }
                }
                next();
            }
        });
    } else {
        console.log('kamne driver');
        next();
    }   
}

module.exports = {
    authDriver,
    authUser
};