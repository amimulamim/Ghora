const database = require('./database');


// function to get id from email
async function getWalletInfo(id)
{
    const sql = `
    SELECT 
        ID,
        ACCOUNT_NO,
        BALANCE,
        PASSWORD
    FROM 
        WALLET
    WHERE
        ID=:id
    `;
const binds = {
    id:id
}
return (await database.execute(sql, binds, database.options)).rows;
}

async function addBalance(id,amount)
{
    const sql = `
    UPDATE WALLET 
    SET 
        BALANCE=BALANCE+:amount
    WHERE
        ID=:id
    `;
const binds = {
    id:id,
    amount:amount
}
return await database.execute(sql, binds, {});
}





module.exports = {
    getWalletInfo,
    addBalance
}