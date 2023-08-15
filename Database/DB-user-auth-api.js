const database = require('./database');



// function to get id from email
async function getUserIDByEmail(email){
    const sql = `
        SELECT 
            ID
        FROM 
            USERS
        WHERE 
            EMAIL = :email
        `;
    const binds = {
        email : email
    }

    return (await database.execute(sql, binds, database.options)).rows;
}

// function to creat new user
// user should have handle, email, pass, dob
// {id} will be returned
// async function createNewUser(user){
//     const sql = `
//         INSERT INTO
//             APP_USER(NAME,EMAIL, PASSWORD,ADDRESS)
//         VALUES 
//             (:name,:email,:password,:address)
//     `;
//     const binds = {
//         name: user.name,
//         email :user.email,
//         password: user.password,
//         address: "user.address",
//     }
//     return await database.execute(sql, binds, {});
// }

// return login info (id, handle, password) from handle
async function getLoginInfoByEmail(email){
    const sql = `
        SELECT 
            USERNAME,
            NAME,
            PASSWORD
        FROM
            USERS
        WHERE
            EMAIL = :email
    `;
    const binds = {
        email: email
    }

    return (await database.execute(sql, binds, database.options)).rows;
}

async function getLoginInfoByUsername(username){
    const sql = `
        SELECT 
            USERNAME,
            NAME,
            PASSWORD,
            EMAIL,
            --IMAGE
        FROM
            USERS
        WHERE
            USERNAME=:username
    `;
    const binds = {
        username :username
    }

    return (await database.execute(sql, binds, database.options)).rows;
}



module.exports = {
    getUserIDByEmail,
    //createNewUser,
    getLoginInfoByEmail,
    getLoginInfoByUsername,
  // updateUserTokenById,
   // getUserPromptById,
   // updateLoginTimeById
}