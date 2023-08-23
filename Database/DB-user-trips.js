const database=require('./database');



//function to get all trip requests


async function makeTripRequests(tripRequest){
    const sql= `
    INSERT INTO
    TRIP_REQUEST(USERNAME,PLAT,PLNG,DLAT,DLNG)
    VALUES(:username,:plat,:plng,:dlat,:dlng)
    `
    const binds={
        username:tripRequest.user.USERNAME,
        plat:tripRequest.pickup.lat,
        plng:tripRequest.pickup.lng,
        dlat:tripRequest.dropoff.lat,
        dlng:tripRequest.dropoff.lng
        
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
    DLNG
    FROM   TRIP_REQUEST
    WHERE

    USERNAME=:username  AND PLAT=:plat AND PLNG=:plng AND DLAT=:dlat AND DLNG=:dlng

    `
    const binds={
        username:tripRequest.user.USERNAME,
        plat:tripRequest.pickup.lat,
        plng:tripRequest.pickup.lng,
        dlat:tripRequest.dropoff.lat,
        dlng:tripRequest.dropoff.lng
        
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
    makeTripRequests,
    getAllTripsByID,
    getAllInfoRequest
}