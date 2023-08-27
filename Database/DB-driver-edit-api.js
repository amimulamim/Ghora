const database = require('./database');


// function to get id from email
async function updateDriverInfo(driver)
{
    const sql = `
    UPDATE 
        DRIVER
    SET 
        --PASSWORD=:password,
        --PLATE_NO=:plate,
        PHONE=:phone,
        SEX=:sex,
        NAME=:name,
        EMAIL=:email,
        WALLET_ID=:wallet
    WHERE
        ID=:id
        
    `;
const binds = {
    email:driver.email,
    //password:driver.password,
    //plate:driver.plate_no,
    phone:driver.phone,
    sex:driver.sex,
    name:driver.name,
    id:driver.id,
    wallet:driver.wallet

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
        id:driver.id,
        password:driver.password
    }
    return await database.execute(sql, binds, {});
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

// async function addNewVehicle(vehicle){
//     const sql = `
//     INSERT INTO
//         VEHICLE(PLATE_NO,MODELNAME,PLAN_ID)
//     VALUES 
//         (:plate,:model,:plan)
//         `;
//     const binds = {
//         plate:vehicle.plate,
//         model:vehicle.model,
//         plan:vehicle.plan
//     }
//     return (await database.execute(sql, binds, database.options)).rows;
// }

async function editVehiclePlate(driver){
    const sql = `
    UPDATE 
        DRIVER
    SET 
        PLATE_NO=:plate
    WHERE 
        ID=:id
        `;
    const binds = {
        id:driver.id,
        plate:driver.plate
    }
    return await database.execute(sql, binds,{});
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
    editPassword,
    editVehiclePlate,
    // editPhone,
    // editPlate,
    // editSex,
    // editWallet
    updateDriverInfo
}