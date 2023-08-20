// libraries
const jwt = require('jsonwebtoken');

// my modules
//const DB_auth = require('../Database/DB-auth-api');

// function to login user into a session
async function loginUser(res, email){
    // create token
    const payload = {
        email: email
    };
    let token = jwt.sign(payload, process.env.JWT_SECRET);
    // put token in db
    //await DB_auth.updateUserTokenById(userId, token);
    // set token in cookie
    let options = {
        maxAge: 900000, 
        httpOnly: true
    }
    res.cookie('userSessionToken', token, options);
}

async function loginDriver(res, email){
    // create token
    const payload = {
        superEmail: email
    };
    let token = jwt.sign(payload, process.env.JWT_SECRET);
    // put token in db
    //await DB_auth.updateUserTokenById(userId, token);
    // set token in cookie
    let options = {
        maxAge: 900000,
        httpOnly: true
    }
    res.cookie('driverSessionToken', token, options);
}

module.exports = {
    loginUser,
    loginDriver
}