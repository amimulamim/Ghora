const database = require('./database');


// function to get id from email
async function getDriverByEmail(email)
{
    const sql = `
    SELECT 
        ID,
        EMAIL,
        NAME,
    FROM 
        DRIVER
    WHERE
        EMAIL=:email
    `;
const binds = {}
return (await database.execute(sql, binds, database.options)).rows;

}
async function getAllDrivers(){
    const sql = `
        SELECT 
            *
        FROM 
            DRIVER
        `;
    const binds = {}
    return (await database.execute(sql, binds, database.options)).rows;
}


module.exports = {
    getAllDrivers,
    getDriverByEmail
}