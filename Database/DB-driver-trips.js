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
         V_TYPE,
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
async function getAllTripsByPlate(plate){
    const sql= `
    SELECT 
         T.TR_ID TID,
         T.START_TIME ST,
         T.FINISH_TIME FT,
         T.USERNAME RIDER,
         R.RATING RATE,
         R.DESCRIPTION DES
    FROM 
        TRIP_HISTORY T JOIN REVIEW R
        ON(T.REVIEW_ID=R.ID)
    WHERE
        T.PLATE_NO=:plate
    `;
    const binds={
        plate:plate
    }
    return (await database.execute(sql,binds,database.options)).rows;
}



module.exports={
    getAllTripRequests,
    getAllTripsByPlate
}