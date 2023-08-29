// libraries
const jwt = require('jsonwebtoken');

// my modules
//const DB_auth = require('../Database/DB-auth-api');

// function to login user into a session
async function loginUser(res, username){
    // create token
    const payload = {
        superUsername:username
    };
    let token = jwt.sign(payload, process.env.JWT_SECRET);
    // put token in db
    //await DB_auth.updateUserTokenById(userId, token);
    // set token in cookie
    let options = {
        maxAge: 1800000, 
        httpOnly: true
    }
    res.cookie('userSessionToken', token, options);
}

async function loginDriver(res, id){
    // create token
    const payload = {
        superID: id
    };
    let token = jwt.sign(payload, process.env.JWT_SECRET);
    // put token in db
    //await DB_auth.updateUserTokenById(userId, token);
    // set token in cookie
    let options = {
        maxAge: 7200000,
        httpOnly: true
    }
    res.cookie('driverSessionToken', token, options);
}

module.exports = {
    loginUser,
    loginDriver
}