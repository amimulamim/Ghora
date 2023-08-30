const database = require('./database');

async function is_available(did){


    const sql= `
SELECT 
    IS_AVAILABLE
    FROM 
    AVAILABILITY
    WHERE D_ID =:did
    `;
    const binds={
        did:did
    }
    return (await database.execute(sql,binds,database.options)).rows;//[0].IS_AVAILABLE;
}

async function is_available_from_running(id){
    const sql= `
SELECT
D_ID FROM
RUNNING_TRIP
WHERE D_ID =:id`;
    const binds={
        id:id
    }
    return (await database.execute(sql,binds,database.options)).rows;
}

async function make_available(id){
    const sql= `
    UPDATE AVAILABILITY 
    SET IS_AVAILABLE = 1 ,LAST_UPDATED=CURRENT_TIMESTAMP
    WHERE D_ID =:id`;
    const binds={
        id:id
    }
    return (await database.execute(sql,binds,database.options)).rows;
}
async function make_unavailable(id){   
    const sql= `
    UPDATE AVAILABILITY 
    SET IS_AVAILABLE = 0 ,LAST_UPDATED=CURRENT_TIMESTAMP
    WHERE D_ID =:id`;
    const binds={
        id:id
    }
    return (await database.execute(sql,binds,database.options)).rows;
}

    module.exports={
        is_available,
        is_available_from_running,
        make_available,
        make_unavailable
    }