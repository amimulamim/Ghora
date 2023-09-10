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
        DLNG,
        FARE

    FROM 
        TRIP_REQUEST
        WHERE TIME_REQUEST>=SYSTIMESTAMP-INTERVAL '30' MINUTE
        ORDER BY ID DESC
    `;
    const binds={
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



async function getNearByTripRequestsOfDriver(did){
    const sql= `
    SELECT 
         ID, 
         USERNAME,
         TIME_REQUEST,
         PLAT,
         PLNG,
         V_TYPE,
        DLAT,
        DLNG,
        FARE

    FROM 
        TRIP_REQUEST
        WHERE TIME_REQUEST>=SYSTIMESTAMP-INTERVAL '30' MINUTE AND V_TYPE=GETVTYPEBYID(:id)
        ORDER BY ID DESC
    `;
    const binds={
        id:did
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
        TRIP_HISTORY T LEFT JOIN REVIEW R
        ON(T.REVIEW_ID=R.ID)
    WHERE
        T.PLATE_NO=:plate
    `;
    const binds={
        plate:plate
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
async function CompletedTripofPlate(plate){
    const sql= `
    SELECT 
    TR_ID,USERNAME,START_TIME,NVL(FINISH_TIME,GET_PAYMENT_TIME(TR_ID)) AS FINISH_TIME,PLATE_NO,PLAT,PLNG,DLAT,DLNG,FARE
    FROM TRIP_HISTORY
    WHERE PLATE_NO=:plate 
    ORDER BY TR_ID DESC
    `;
    const binds={
        plate:plate
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

async function CompletedTripofDriverbyId(d_id){
    const sql= `
    SELECT 
    TR_ID,USERNAME,START_TIME,NVL(FINISH_TIME,GET_PAYMENT_TIME(TR_ID)) AS FINISH_TIME,PLATE_NO,PLAT,PLNG,DLAT,DLNG,FARE
    FROM TRIP_HISTORY
    WHERE GETDRIVERIDFROMPLATE(PLATE_NO)=:d_id 
    ORDER BY TR_ID DESC
    `;
    const binds={
        d_id:d_id
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



module.exports={
    getAllTripRequests,
    getAllTripsByPlate,
    getNearByTripRequestsOfDriver,
    CompletedTripofPlate,
    CompletedTripofDriverbyId
}