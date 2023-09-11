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

async function getDriverByPlate(plate)
{
    const sql = `
    SELECT 
        ID,
        EMAIL,
        NAME,
        MODEL_DETAILS(:plate) AS VNAME,
        GETIMAGEOFDRIVER(ID) AS IMAGE
    FROM 
        DRIVER
    WHERE
        PLATE_NO= :plate
    `;
const binds = {
    plate: plate
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
        ID,
        NAME,
        EMAIL,
        PHONE,
        SEX,
        WALLET_ID,
        PLATE_NO,
        LAT,
        LNG,
        IMAGE
    FROM 
        DRIVER 
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
async function getAllInfoByID(id){
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
        LNG,
        IMAGE
    FROM 
        DRIVER 
    WHERE 
        ID= :id
    `;
    const binds={
        id:id
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
     DRIVER
     WHERE EMAIL= :email
    `;
    const binds={
        email: email
    }

    return (await database.execute(sql,binds,database.options)).rows;

}

async function getWalletIdByID(id){
    const sql=
   `SELECT
     WALLET_ID
     FROM 
     DRIVER
     WHERE ID= :id 
    `;
    const binds={
        id: id
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


async function getallDriverLocations(){
    // const sql=
    // `
    // SELECT DISTINCT ROUND(lat, 2) AS LAT,ROUND(lng, 2) AS LNG,GETVTYPEBYID(ID)  AS V_TYPE FROM DRIVER
    // `;
    const sql=
    `
    SELECT DISTINCT D.LAT AS LAT,D.LNG AS LNG,GETVTYPEBYID(D.ID)  AS V_TYPE 
    FROM 
    DRIVER D JOIN
    AVAILABILITY A on D.ID=A.D_ID 
    WHERE IS_AVAILABLE=1 AND LAST_UPDATED>=SYSTIMESTAMP-INTERVAL '1' HOUR`;
    const binds = {
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
    getAllDrivers,
    getDriverByEmail,
    getAllInfo,
    getWalletId,
    updateDriverLocation,
    getAllInfoByID,
    getDriverByPlate,
    getallDriverLocations,
    getWalletIdByID
}