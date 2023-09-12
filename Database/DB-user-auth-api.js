const database = require('./database');

async function getUserByWallet(walletId) {
    const sql=`
    SELECT USERNAME FROM USERS WHERE WALLET_ID = :walletId
    `;
    const binds = {
        walletId: walletId
    }
    try {
        const result = await database.execute(sql, binds, database.options);
        const rows = result.rows;
       // console.log('pool er jonno database theke  : ',rows);
        return rows;
        // Process the result rows
    } catch (error) {
        console.error('Error executing SQL while login info newa:', error);
    }

}

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

    
    try {
        const result = await database.execute(sql, binds, database.options);
        const rows = result.rows;
       // console.log('pool er jonno database theke  : ',rows);
        return rows;
        // Process the result rows
    } catch (error) {
        console.error('Error executing SQL while login info newa:', error);
    }
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
   // return await database.execute(sql, binds, {});
   try {
    const result = await database.execute(sql, binds, database.options);
    const rows = result.rows;
   // console.log('pool er jonno database theke  : ',rows);
    return rows;
    // Process the result rows
} catch (error) {
    console.error('Error executing SQL while login info newa:', error);
}
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
            LNG,
            GETIMAGEOFUSER(USERNAME) AS IMAGE
        FROM
            USERS
        WHERE
            EMAIL = :email
    `;
    const binds = {
        email: email
    }


   try {
    const result = await database.execute(sql, binds, database.options);
    const rows = result.rows;
    //console.log('pool er jonno database theke  : ',rows);
    return rows;
    // Process the result rows
} catch (error) {
    console.error('Error executing SQL while login info newa:', error);
}
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
            LNG,
            GETIMAGEOFUSER(:username) AS IMAGE
        FROM
            USERS
        WHERE
            lower(USERNAME)=lower(:username)
    `;
    const binds = {
        username :username
    }

    
    try {
        const result = await database.execute(sql, binds, database.options);
        const rows = result.rows;
        //console.log('ussssssssssssserrrrrr er jonno database theke  : ',rows,username);
        return rows;
        // Process the result rows
    } catch (error) {
        console.error('Error executing SQL while login info newa:', error);
    }
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

    
    try {
        const result = await database.execute(sql, binds, database.options);
        const rows = result.rows;
       // console.log('pool er jonno database theke  : ',rows);
        return rows;
        // Process the result rows
    } catch (error) {
        console.error('Error executing SQL while login info newa:', error);
    }
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

    //return await database.execute(sql, binds, {});
    try {
        const result = await database.execute(sql, binds, database.options);
        const rows = result.rows;
      //  console.log('pool er jonno database theke  : ',rows);
        return rows;
        // Process the result rows
    } catch (error) {
        console.error('Error executing SQL while login info newa:', error);
    }

}



module.exports = {
    getUsernameByEmail,
    createNewUser,
    getLoginInfoByEmail,
    getLoginInfoByUsername,
    getUsernameByPhone,
    changePassword,
    getUserByWallet
  // updateUserTokenById,
   // getUserPromptById,
   // updateLoginTimeById
}