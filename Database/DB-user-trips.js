const database=require('./database');



//function to get all trip requests




async function makeTripRequests(tripRequest){
    const sql= `
    INSERT INTO
    TRIP_REQUEST(USERNAME,PLAT,PLNG,DLAT,DLNG,V_TYPE,FARE)
    VALUES(:username,:plat,:plng,:dlat,:dlng,:v_type,:fare)
    `
    const binds={
        username:tripRequest.user.USERNAME,
        plat:tripRequest.pickup.lat,
        plng:tripRequest.pickup.lng,
        dlat:tripRequest.dropoff.lat,
        dlng:tripRequest.dropoff.lng,
        v_type:tripRequest.v_type,
        fare:tripRequest.fare

        
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
        DLNG,
        FARE

    FROM 
        TRIP_REQUEST
        WHERE TIME_REQUEST>=SYSTIMESTAMP-INTERVAL '30' MINUTE AND USERNAME=:username
    `;
    const binds={
        username:username
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
        DLNG,
        FARE

    FROM 
        RUNNING_TRIP
        WHERE  USERNAME=:username AND NOTIFIED=:notified
        ORDER BY TIME_REQUEST DESC
    `;
    const binds={
        username:username,
        notified:0
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
        DLNG,
        FARE

    FROM 
        RUNNING_TRIP
        WHERE  USERNAME=:username
        ORDER BY TIME_REQUEST DESC
    `;
    const binds={
        username:username
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



async function getAllInfoRequest(tripRequest){
    const sql= `
    
    SELECT
    USERNAME,
    PLAT,
    PLNG,
    DLAT,
    DLNG,
    V_TYPE,
    FARE
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
        V_TYPE,
        FARE

    FROM 
        TRIP_REQUEST
        WHERE USERNAME=:username 
        AND TIME_REQUEST>=SYSTIMESTAMP-INTERVAL '30' MINUTE
    `;
    const binds={
        username:username,
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

async function getOldPendingRequests(username){
    const sql= `
    SELECT 
         ID, 
         USERNAME,
         TIME_REQUEST,
         PLAT,
         PLNG,
        DLAT,
        DLNG,
        V_TYPE,
        FARE

    FROM 
        TRIP_REQUEST
        WHERE USERNAME=:username 
        AND TIME_REQUEST<SYSTIMESTAMP-INTERVAL '30' MINUTE
    `;
    const binds={
        username:username,
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


async function deleteOldPendingRequests(username){
    const sql= `
    DELETE 

    FROM 
        TRIP_REQUEST
        WHERE USERNAME=:username 
        AND TIME_REQUEST<SYSTIMESTAMP-INTERVAL '30' MINUTE
    `;
    const binds={
        username:username,
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













async function cancelRequest(username)  {
    const sql= `
    DELETE FROM TRIP_REQUEST WHERE USERNAME=:username
    `;
    const binds={
        username:username
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


async function CompletedTripofUser(username){
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
    makeTripRequests,
    getAllTripsByID,
    getAllInfoRequest,
    getPendingRequests,
    cancelRequest,
    getTripRequestsOfUser,

    getTripRunningsOfUser,
    getTripUnnotifiedOfUser,Notified,
    CompletedTripofUser,
    getOldPendingRequests,
    deleteOldPendingRequests
}