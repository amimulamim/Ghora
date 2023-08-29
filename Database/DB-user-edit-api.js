const database = require('./database');


// function to get id from email
async function updateUserInfo(user)
{
    const sql = `
    UPDATE 
        USERS
    SET 
    PHONE=:phone,
    SEX=:sex,
    NAME=:name,
    EMAIL=:email,
    WALLET_ID=:wallet
    WHERE
        USERNAME=:username
    `;
const binds = {
    email:user.email,
    phone:user.phone,
    sex:user.sex,
    name:user.name,
    wallet:user.wallet,
    username:user.username
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

async function editVehiclePlate(id,plate){
    const sql = `
    UPDATE DRIVER
    SET PLATE_NO=:plate_no
    WHERE ID=:id
        `;
    const binds = {
        id:id,
        plate:plate
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
    updateUserInfo,
    editPassword
}