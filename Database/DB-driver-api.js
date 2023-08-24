const database = require('./database');


// function to get id from email
async function getDriverByEmail(email)
{
    const sql = `
    SELECT 
        ID,
        EMAIL,
        NAME
    FROM 
        DRIVER
    WHERE
        EMAIL= :email
    `;
const binds = {
    email: email
}
return (await database.execute(sql, binds, database.options)).rows;

}

async function updateDriverLocation(dvloc){
    
    const sql = `
    UPDATE 
        DRIVER
    SET 
        LAT = :lat,
        LNG = :lng
    WHERE ID = :id
            `;
    const binds = {
        lat: dvloc.LATITUDE,
        lng: dvloc.LONGITUDE,
        id:dvloc.DRIVER_ID
    }
    console.log(binds);
    //return (await database.execute(sql, binds, {}));
    return await database.execute(sql, binds, {});

}

async function getAllDrivers(){
    const sql = `
        SELECT 
            *
        FROM 
            DRIVER
        `;
    const binds = {}
    return (await database.execute(sql, binds, database.options)).rows;
}


async function getAllInfo(email){
    const sql=`
    SELECT 
        ID,
        NAME,
        EMAIL,
        PHONE,
        SEX,
        WALLET_ID,
        PLATE_NO,
        LAT,
        LNG
    FROM 
        DRIVER 
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
     DRIVER
     WHERE EMAIL= :email 
    `;
    const binds={
        email: email
    }

    return (await database.execute(sql,binds,database.options)).rows;

}


module.exports = {
    getAllDrivers,
    getDriverByEmail,
    getAllInfo,
    getWalletId,
    updateDriverLocation
}