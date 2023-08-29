const database=require('./database');



//function to get all trip requests


async function makeTripRequests(tripRequest){
    const sql= `
    INSERT INTO
    TRIP_REQUEST(USERNAME,PLAT,PLNG,DLAT,DLNG,V_TYPE)
    VALUES(:username,:plat,:plng,:dlat,:dlng,:v_type)
    `
    const binds={
        username:tripRequest.user.USERNAME,
        plat:tripRequest.pickup.lat,
        plng:tripRequest.pickup.lng,
        dlat:tripRequest.dropoff.lat,
        dlng:tripRequest.dropoff.lng,
        v_type:tripRequest.v_type

        
    }
    return (await database.execute(sql,binds,database.options)).rows;
    
}

async function getTripRequestsOfUser(username){
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
        WHERE TIME_REQUEST>=SYSTIMESTAMP-INTERVAL '30' MINUTE AND USERNAME=:username
    `;
    const binds={
        username:username
    }
    return (await database.execute(sql,binds,database.options)).rows;
}  

async function getTripUnnotifiedOfUser(username){
    const sql= `
    SELECT 
         TR_ID, 
         D_ID, 
         USERNAME,
         TIME_REQUEST,
         PLAT,
         PLNG,
        DLAT,
        DLNG

    FROM 
        RUNNING_TRIP
        WHERE  USERNAME=:username AND NOTIFIED=:notified
        ORDER BY TIME_REQUEST DESC
    `;
    const binds={
        username:username,
        notified:0
    }
    return (await database.execute(sql,binds,database.options)).rows;
}

async function getTripRunningsOfUser(username){
    const sql= `
    SELECT 
         TR_ID, 
         D_ID, 
         USERNAME,
         TIME_REQUEST,
         PLAT,
         PLNG,
        DLAT,
        DLNG

    FROM 
        RUNNING_TRIP
        WHERE  USERNAME=:username
        ORDER BY TIME_REQUEST DESC
    `;
    const binds={
        username:username
    }
    return (await database.execute(sql,binds,database.options)).rows;
} 



async function getAllInfoRequest(tripRequest){
    const sql= `
    
    SELECT
    USERNAME,
    PLAT,
    PLNG,
    DLAT,
    DLNG,
    V_TYPE
    FROM   TRIP_REQUEST
    WHERE

    USERNAME=:username  AND PLAT=:plat AND PLNG=:plng AND DLAT=:dlat AND DLNG=:dlng AND V_TYPE=:v_type

    `
    const binds={
        username:tripRequest.user.USERNAME,
        plat:tripRequest.pickup.lat,
        plng:tripRequest.pickup.lng,
        dlat:tripRequest.dropoff.lat,
        dlng:tripRequest.dropoff.lng,
        v_type:tripRequest.v_type
        
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

async function getPendingRequests(username){
    const sql= `
    SELECT 
         ID, 
         USERNAME,
         TIME_REQUEST,
         PLAT,
         PLNG,
        DLAT,
        DLNG,
        V_TYPE

    FROM 
        TRIP_REQUEST
        WHERE USERNAME=:username 
        AND TIME_REQUEST>=SYSTIMESTAMP-INTERVAL '30' MINUTE
    `;
    const binds={
        username:username,
    }
    return (await database.execute(sql,binds,database.options)).rows;
}

async function cancelRequest(username)  {
    const sql= `
    DELETE FROM TRIP_REQUEST WHERE USERNAME=:username
    `;
    const binds={
        username:username
    }
    return (await database.execute(sql,binds,database.options)).rows;
}

async function Notified(username) {
    const sql = `
    UPDATE RUNNING_TRIP
    SET NOTIFIED=:notified
    WHERE USERNAME=:username
        `;
    const binds = {
        username:username,
        notified:1
    }
    return (await database.execute(sql, binds, database.options)).rows;
}
async function getAllTripsByUsername(username){
    const sql= `
    SELECT 
         T.TR_ID TID,
         T.START_TIME ST,
         T.FINISH_TIME FT,
         T.PLATE_NO VEH,
         R.RATING RATE,
         R.DESCRIPTION DES
    FROM 
        TRIP_HISTORY T JOIN REVIEW R
        ON(T.REVIEW_ID=R.ID)
    WHERE
        T.USERNAME=:username
    `;
    const binds={
        username:username
    }
    return (await database.execute(sql,binds,database.options)).rows;
}


module.exports={
    makeTripRequests,
    getAllTripsByID,
    getAllInfoRequest,
    getPendingRequests,
    cancelRequest,
    getTripRequestsOfUser,

    getTripRunningsOfUser,
    getTripUnnotifiedOfUser,Notified
}