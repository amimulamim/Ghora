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
        DLNG,
        FARE

    FROM 
        TRIP_REQUEST
        WHERE ID=:id
    `;
    const binds={
        id:id
    }
    return (await database.execute(sql,binds,database.options)).rows;



}

async function runningOfDriver(did){
    const sql= `
    SELECT 
         TR_ID,
         D_ID, 
         USERNAME,
         TIME_REQUEST,
         PLAT,
         PLNG,
        DLAT,
        DLNG,
        FARE
        FROM RUNNING_TRIP
        WHERE D_ID=:did
        ORDER BY TR_ID
        `;
        const binds={
            did:did
        }
        return (await database.execute(sql,binds,database.options)).rows;
}


async function runningOfUser(username){
    const sql= `
    SELECT 
         TR_ID,
         D_ID, 
         USERNAME,
         TIME_REQUEST,
         PLAT,
         PLNG,
        DLAT,
        DLNG,
        FARE
        FROM RUNNING_TRIP
        WHERE USERNAME=:username
        `;
        const binds={
            username:username
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
        DLNG,
        FARE

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

async function deleteRunning(tid,did){

    const sql= `
    DELETE
     FROM
        RUNNING_TRIP
        WHERE D_ID=:d_id AND TR_ID=:tr_id
    `;
    const binds={
        d_id:did,
        tr_id:tid
    }
    return (await database.execute(sql,binds,database.options)).rows;

}


async function createRunningTrip(tripRequest,did){
    const sql= `
    INSERT INTO
    RUNNING_TRIP(TR_ID,D_ID,USERNAME,TIME_REQUEST,PLAT,PLNG,DLAT,DLNG,FARE)
    VALUES(:tr_id,:d_id,:username,:time_request,:plat,:plng,:dlat,:dlng,:fare)
    `
    const binds={
        d_id:did,
        username:tripRequest.USERNAME,
        plat:tripRequest.PLAT,
        plng:tripRequest.PLNG,
        dlat:tripRequest.DLAT,
        dlng:tripRequest.DLNG,
        time_request:tripRequest.TIME_REQUEST,
        tr_id:tripRequest.TR_ID,
        fare:tripRequest.FARE

        
    }
    return (await database.execute(sql,binds,database.options)).rows;


}

async function createTripHistory(trip){
    const sql= `
    INSERT INTO
    TRIP_HISTORY(TR_ID,USERNAME,START_TIME,PLATE_NO,PLAT,PLNG,DLAT,DLNG,FARE)
    VALUES(:tr_id,:username,:time_request,getPlate(:d_id),:plat,:plng,:dlat,:dlng,:fare)
    `;
    const binds={
        tr_id:trip.TR_ID,
        username:trip.USERNAME,
        d_id:trip.D_ID,
        plat:trip.PLAT,
        plng:trip.PLNG,
        dlat:trip.DLAT,
        dlng:trip.DLNG,
        time_request:trip.TIME_REQUEST,
        fare:trip.FARE
    
    }
    return (await database.execute(sql,binds,database.options)).rows;


}



async function completedTripDetailsofDriver(did){
    const sql= `
    SELECT 
    TR_ID,USERNAME,START_TIME,NVL(FINISH_TIME,GET_PAYMENT_TIME(TR_ID)) AS FINISH_TIME,PLATE_NO,PLAT,PLNG,DLAT,DLNG,FARE

    FROM 
        TRIP_HISTORY
        WHERE 
        GETDRIVERIDFROMPLATE(PLATE_NO)=:d_id
        --PLATE_NO=getPlate(:d_id)
    ORDER BY TR_ID DESC
    `;
    const binds={
        d_id:did
    }
    return (await database.execute(sql,binds,database.options)).rows;



}

async function completedTripDetailsofUser(username){
    const sql= `
    SELECT 
    TR_ID,USERNAME,START_TIME,NVL(FINISH_TIME,GET_PAYMENT_TIME(TR_ID)) AS FINISH_TIME,PLATE_NO,PLAT,PLNG,DLAT,DLNG,FARE
    FROM TRIP_HISTORY
    WHERE USERNAME=:username
    ORDER BY TR_ID DESC
    `;
    const binds={
        username:username
    }
    return (await database.execute(sql,binds,database.options)).rows;

}

async function unNotifiedCompletedTripofUser(username){
    const sql= `
    SELECT 
    TR_ID,USERNAME,START_TIME,PLATE_NO,PLAT,PLNG,DLAT,DLNG,FARE
    FROM TRIP_HISTORY
    WHERE USERNAME=:username AND FINISH_TIME IS NULL
    ORDER BY START_TIME DESC
    `;
    const binds={
        username:username
    }
    return (await database.execute(sql,binds,database.options)).rows;

}

async function makeNotifiedTripHistory(tr_id){
    const sql= `
    UPDATE TRIP_HISTORY SET FINISH_TIME=CURRENT_TIMESTAMP WHERE TR_ID=:tr_id
    `;
    const binds={
        tr_id:tr_id
    }
    return (await database.execute(sql,binds,database.options)).rows;
}



module.exports=
{tripReqDetails,
    deleteReq,
    createRunningTrip,
    runningTripDetails,
    runningOfDriver ,
    runningOfUser,
    deleteRunning,
    createTripHistory,
    completedTripDetailsofDriver,
    completedTripDetailsofUser,
    unNotifiedCompletedTripofUser,
    makeNotifiedTripHistory
};