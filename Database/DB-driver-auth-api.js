const database = require('./database');



// function to get id from email
async function getDriverIDByEmail(email){
    const sql = `
        SELECT 
            ID
        FROM 
            DRIVER
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
            ID,
            NAME,
            PASSWORD
        FROM
            DRIVER
        WHERE
            EMAIL = :email
    `;
    const binds = {
        email: email
    }

    return (await database.execute(sql, binds, database.options)).rows;
}

async function getLoginInfoByID(id){
    const sql = `
        SELECT 
            ID,
            NAME,
            PASSWORD,
            EMAIL,
            --IMAGE
        FROM
            DRIVER
        WHERE
            ID = :id
    `;
    const binds = {
        id: id
    }

    return (await database.execute(sql, binds, database.options)).rows;
}



module.exports = {
    getDriverIDByEmail,
    //createNewUser,
    getLoginInfoByEmail,
    getLoginInfoByID,
  // updateUserTokenById,
   // getUserPromptById,
   // updateLoginTimeById
}