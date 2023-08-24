const database=require('./database');



//function to get all trip requests
async function getAllTripRequests(){
    const sql= `
    SELECT 
         ID, 
         USERNAME,
         TIME_REQUEST,
         PLAT,
         PLNG,
        DLAT,
        DLNG

    FROM 
        TRIP_REQUEST
        WHERE TIME_REQUEST>=SYSTIMESTAMP-INTERVAL '30' MINUTE
    `;
    const binds={
    }
    return (await database.execute(sql,binds,database.options)).rows;
}
//function to get trip history of driver
async function getAllTripsByID(ID){
    const sql= `
    SELECT 
         *
    FROM 
        TRIP_HISTORY T
    WHERE
        T.ID=:id

    `
    const binds={
        id:ID
    }
    return (await database.execute(sql,binds,database.options)).rows;
}

module.exports={
    getAllTripRequests,
    getAllTripsByID
}