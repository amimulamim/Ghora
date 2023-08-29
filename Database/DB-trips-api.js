const database=require('./database');

async function tripReqDetails(id){
    const sql= `
    SELECT 
         ID AS TR_ID, 
         USERNAME,
         TIME_REQUEST,
         PLAT,
         PLNG,
        DLAT,
        DLNG

    FROM 
        TRIP_REQUEST
        WHERE ID=:id
    `;
    const binds={
        id:id
    }
    return (await database.execute(sql,binds,database.options)).rows;



}



async function runningTripDetails(tr_id){
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
        WHERE TR_ID=:id
ORDER BY TIME_REQUEST DESC
    `;
    const binds={
        id:tr_id
    }
    return (await database.execute(sql,binds,database.options)).rows;



}

async function deleteReq(id){

    const sql= `
    DELETE
     FROM
        TRIP_REQUEST
        WHERE ID=:id
    `;
    const binds={
        id:id
    }
    return (await database.execute(sql,binds,database.options)).rows;

}

async function createRunningTrip(tripRequest,did){
    const sql= `
    INSERT INTO
    RUNNING_TRIP(TR_ID,D_ID,USERNAME,TIME_REQUEST,PLAT,PLNG,DLAT,DLNG)
    VALUES(:tr_id,:d_id,:username,:time_request,:plat,:plng,:dlat,:dlng)
    `
    const binds={
        d_id:did,
        username:tripRequest.USERNAME,
        plat:tripRequest.PLAT,
        plng:tripRequest.PLNG,
        dlat:tripRequest.DLAT,
        dlng:tripRequest.DLNG,
        time_request:tripRequest.TIME_REQUEST,
        tr_id:tripRequest.TR_ID

        
    }
    return (await database.execute(sql,binds,database.options)).rows;


}



module.exports=
{tripReqDetails,
    deleteReq,
    createRunningTrip,
    runningTripDetails
    
};