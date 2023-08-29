const database = require('./database');


// function to get id from email
async function getUsersByEmail(email)
{
    const sql = `
    SELECT 
        username,
        EMAIL,
        NAME
    FROM 
        USERS
    WHERE
        EMAIL=:email
    `;
const binds = {
    email:email
}
return (await database.execute(sql, binds, database.options)).rows;

}
async function getAllUsers(){
    const sql = `
        SELECT 
            *
        FROM 
            USERS
        `;
    const binds = {}
    return (await database.execute(sql, binds, database.options)).rows;
}
async function getAllInfo(email){
    const sql=`
    SELECT 
        USERNAME,
        NAME,
        EMAIL,
        PHONE,
        SEX,
        WALLET_ID
    FROM 
        USERS
    WHERE 
        EMAIL= :email
    `;
    const binds={
        email:email
    }
    return (await database.execute(sql,binds,database.options)).rows;
}
async function getWalletId(email){
    const sql=
   `SELECT
     WALLET_ID
     FROM 
     USERS
     WHERE EMAIL= :email 
    `;
    const binds={
        email: email
    }

    return (await database.execute(sql,binds,database.options)).rows;

}
async function getAllInfoByUsername(username){
    const sql=`
    SELECT 
        USERNAME,
        NAME,
        EMAIL,
        PHONE,
        SEX,
        WALLET_ID,
      
        LAT,
        LNG
    FROM 
        USERS
    WHERE 
        USERNAME=:username
    `;
    const binds={
        username:username
    }
    return (await database.execute(sql,binds,database.options)).rows;
}


module.exports = {
    getAllUsers,
    getUsersByEmail,
    getAllInfo,
    getWalletId,
    getAllInfoByUsername
}