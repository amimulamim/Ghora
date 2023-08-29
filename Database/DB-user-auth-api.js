const database = require('./database');



// function to get id from email
async function getUsernameByEmail(email){
    const sql = `
        SELECT 
            USERNAME
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
async function createNewUser(user){
    const sql = `
        INSERT INTO
            USERS(username,NAME,EMAIL,phone, PASSWORD,SEX,IS_ADMIN)
        VALUES 
            (:username,:name,:email,:phone,:password,:sex,:is_admin)
    `;
    const binds = {
        name: user.name,
        email :user.email,
        phone:user.phone,
        password: user.password,
        sex: user.sex,
        username: user.username,
        is_admin:0
    }
    return await database.execute(sql, binds, {});
}

// return login info (id, handle, password) from handle
async function getLoginInfoByEmail(email){
    const sql = `
        SELECT 
            USERNAME,
            NAME,
            PASSWORD,
            EMAIL,
            PHONE,
            WALLET_ID,
            SEX,
            LAT,
            LNG
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
            PHONE,
            WALLET_ID,
            SEX,
            LAT,
            LNG

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
async function getUsernameByPhone(phone){
    const sql = `
        SELECT 
            USERNAME
        FROM 
            USERS
            
        WHERE 
            PHONE = :phone
        `;
    const binds = {
        phone : phone
    }

    return (await database.execute(sql, binds, database.options)).rows;
}
async function changePassword(username,pass){
    const sql = `
    UPDATE USERS
    SET 
        PASSWORD=:pass
    WHERE
        USERNAME = :username
    `;
    const binds = {
        username:username,
        pass:pass
    }

    return await database.execute(sql, binds, {});

}



module.exports = {
    getUsernameByEmail,
    createNewUser,
    getLoginInfoByEmail,
    getLoginInfoByUsername,
    getUsernameByPhone,
    changePassword
  // updateUserTokenById,
   // getUserPromptById,
   // updateLoginTimeById
}