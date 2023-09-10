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
 try {
        const result = await database.execute(sql, binds, database.options);
        const rows = result.rows;
        //console.log('db func hote: ', rows);
        return rows;
        // Process the result rows
    } catch (error) {
        console.error('Error executing SQL:', error);
    }

}
async function getAllUsers(){
    const sql = `
        SELECT 
            *
        FROM 
            USERS
        `;
    const binds = {}
     try {
        const result = await database.execute(sql, binds, database.options);
        const rows = result.rows;
        //console.log('db func hote: ', rows);
        return rows;
        // Process the result rows
    } catch (error) {
        console.error('Error executing SQL:', error);
    }
}
async function getAllInfo(email){
    const sql=`
    SELECT 
        USERNAME,
        NAME,
        EMAIL,
        PHONE,
        SEX,
        WALLET_ID,
        IMAGE
    FROM 
        USERS
    WHERE 
        EMAIL= :email
    `;
    const binds={
        email:email
    }
     try {
        const result = await database.execute(sql, binds, database.options);
        const rows = result.rows;
        //console.log('db func hote: ', rows);
        return rows;
        // Process the result rows
    } catch (error) {
        console.error('Error executing SQL:', error);
    }
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
        email:email
    }

    return (await database.execute(sql,binds,database.options)).rows;

}
async function getWalletIdByUsername(username){
    const sql=
   `SELECT
     WALLET_ID
     FROM 
     USERS
     WHERE USERNAME= :username 
    `;
    const binds={
        username:username
    }

     try {
        const result = await database.execute(sql, binds, database.options);
        const rows = result.rows;
        //console.log('db func hote: ', rows);
        return rows;
        // Process the result rows
    } catch (error) {
        console.error('Error executing SQL:', error);
    }

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
     try {
        const result = await database.execute(sql, binds, database.options);
        const rows = result.rows;
        //console.log('db func hote: ', rows);
        return rows;
        // Process the result rows
    } catch (error) {
        console.error('Error executing SQL:', error);
    }
}


module.exports = {
    getAllUsers,
    getUsersByEmail,
    getAllInfo,
    getWalletId,
    getAllInfoByUsername,
    getWalletIdByUsername
}