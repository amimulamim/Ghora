const database=require('./database');



//function to get all trip requests


async function makeTripRequests(){
   /* const sql= `
    INSERT INTO
        TRIP_REQUEST VALUES()
    `
    const binds={
    }
    return (await database.execute(sql,binds,database.options)).rows;
    */
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
    getAllTripsByID
}