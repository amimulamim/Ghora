const database = require('./database');


// function to get id from email
async function updateDriverInfo(driver)
{
    const sql = `
    UPDATE 
        DRIVER
    SET 
        PASSWORD=:password,
        PHONE=:phone,
        --SEX=:sex,
        NAME=:name
    WHERE
        EMAIL=:email
    `;
const binds = {
    email:driver.email,
    password:driver.password,
    phone:driver.phone,
    //sex:driver.SEX,
    name:driver.name
}
return await database.execute(sql, binds, {});

}
async function editName(driver){
    const sql = `
    UPDATE DRIVER
    SET NAME=:name
    WHERE ID=:id
        `;
    const binds = {
        id:driver.ID,
        name:driver.NAME
    }
    return (await database.execute(sql, binds, database.options)).rows;
}

async function editPassword(driver){
    const sql = `
    UPDATE DRIVER
    SET PASSWORD=:password
    WHERE ID=:id
        `;
    const binds = {
        id:driver.ID,
        password:driver.PASSWORD
    }
    return (await database.execute(sql, binds, database.options)).rows;
}

async function editPhone(driver){
    const sql = `
    UPDATE DRIVER
    SET PHONE=:phone
    WHERE ID=:id
        `;
    const binds = {
        id:driver.ID,
        phone:driver.PHONE
    }
    return (await database.execute(sql, binds, database.options)).rows;
}

async function editSex(driver){
    const sql = `
    UPDATE DRIVER
    SET SEX=:sex
    WHERE ID=:id
        `;
    const binds = {
        id:driver.ID,
        sex:driver.SEX
    }
    return (await database.execute(sql, binds, database.options)).rows;
}

async function editPlate(driver){
    const sql = `
    UPDATE DRIVER
    SET PLATE_NO=:plate_no
    WHERE ID=:id
        `;
    const binds = {
        id:driver.ID,
        plate_no:driver.PLATE_NO
    }
    return (await database.execute(sql, binds, database.options)).rows;
}

async function editWallet(driver){
    const sql = `
    UPDATE DRIVER
    SET WALLET_ID=:wallet_id
    WHERE ID=:id
        `;
    const binds = {
        id:driver.ID,
        wallet_id:driver.WALLET_ID
    }
    return (await database.execute(sql, binds, database.options)).rows;
}



module.exports = {
    // ediEmail,
    // editName,
    // editPassword,
    // editPhone,
    // editPlate,
    // editSex,
    // editWallet
    updateDriverInfo
}