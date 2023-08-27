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

    return (await database.execute(sql, binds, database.options)).rows;
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
    return await database.execute(sql, binds, {});
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
            LAT,
            LNG
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
    createNewDriver,
    getLoginInfoByEmail,
    getLoginInfoByID,
    getDriverIDByPhone
  // updateUserTokenById,
   // getUserPromptById,
   // updateLoginTimeById
}