const database = require('./database');


async function getDriverByWallet(walletId) {
    const sql=`
    SELECT ID FROM DRIVER WHERE WALLET_ID = :walletId
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

   // return (await database.execute(sql, binds, database.options)).rows;
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

async function getDriverIDByPhone(phone){
    const sql = `
        SELECT 
            ID
        FROM 
            DRIVER
        WHERE 
            PHONE = :phone
        `;
    const binds = {
        phone : phone
    }

    //return (await database.execute(sql, binds, database.options)).rows;
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

// function to creat new user
//user should have handle, email, pass, dob
//{id} will be returned
async function createNewDriver(driver){
    const sql = `
        INSERT INTO
            DRIVER(NAME,EMAIL,PASSWORD,PHONE,SEX)
        VALUES 
            (:name,:email,:password,:phone,:sex)
    `;
    const binds = {
        name: driver.name,
        email :driver.email,
        password: driver.password,
        phone: driver.phone,
        sex : driver.sex
    }
    //return await database.execute(sql, binds, {});
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

// return login info (id, handle, password) from handle
async function getLoginInfoByEmail(email){
    const sql = `
        SELECT 
            ID,
            NAME,
            PASSWORD,
            PHONE,
            WALLET_ID,
            SEX,
            PLATE_NO,
            LAT,
            LNG,
            GETIMAGEOFDRIVER(ID) AS IMAGE
        FROM
            DRIVER
        WHERE
            EMAIL = :email
    `;
    const binds = {
        email: email
    }

   // return (await database.execute(sql, binds, database.options)).rows;
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

async function getLoginInfoByID(id){
    const sql = `
    SELECT
        ID,
        NAME,
        EMAIL,
        PASSWORD,
        PHONE,
        WALLET_ID,
        SEX,
        PLATE_NO,
        LAT,
        LNG,
        GETIMAGEOFDRIVER(:id) AS IMAGE
    FROM
        DRIVER
    WHERE
        ID = :id
    `;
    const binds = {
        id: id
    }

   // return (await database.execute(sql, binds, database.options)).rows;

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

async function changePassword(id,pass){
    const sql = `
    UPDATE DRIVER
    SET 
        PASSWORD=:pass
    WHERE
        ID = :id
    `;
    const binds = {
        id: id,
        pass:pass
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



module.exports = {
    getDriverIDByEmail,
    createNewDriver,
    getLoginInfoByEmail,
    getLoginInfoByID,
    getDriverIDByPhone,
    changePassword,
    getDriverByWallet
  // updateUserTokenById,
   // getUserPromptById,
   // updateLoginTimeById
}