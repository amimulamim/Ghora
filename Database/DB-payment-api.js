const database=require('./database');

async function getPaymentDetails(tid){
    const sql= `
    SELECT 
        TR_ID,
        TRANSACTION_NO,
        AMOUNT,
        CONVERT_TO_GMT6(PAYMENT_TIME) AS WHEN

    FROM 
        payments
        WHERE TR_ID=:id
    `;
    const binds={
        id:tid
    }
    return (await database.execute(sql,binds,database.options)).rows;



}
module.exports = {
    getPaymentDetails
};