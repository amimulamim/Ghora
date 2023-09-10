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
     try {
        const result = await database.execute(sql, binds, database.options);
        const rows = result.rows;
        //console.log('db func hote: ', rows);
        return rows;
        // Process the result rows
    } catch (error) {
        console.error('Error executing SQL:', error);
    }//[0].IS_AVAILABLE;
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

async function make_available(id){
    const sql= `
    UPDATE AVAILABILITY 
    SET IS_AVAILABLE = 1 ,LAST_UPDATED=CURRENT_TIMESTAMP
    WHERE D_ID =:id`;
    const binds={
        id:id
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
async function make_unavailable(id){   
    const sql= `
    UPDATE AVAILABILITY 
    SET IS_AVAILABLE = 0 ,LAST_UPDATED=CURRENT_TIMESTAMP
    WHERE D_ID =:id`;
    const binds={
        id:id
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
        is_available,
        is_available_from_running,
        make_available,
        make_unavailable
    }