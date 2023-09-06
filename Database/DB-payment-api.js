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
async function getPaymentsOfUser(username){

    const sql = `SELECT T.TR_ID AS TR_ID,TRANSACTION_NO,ROUND(AMOUNT,2) AS AMOUNT,PAYMENT_TIME,USERNAME,D.NAME AS DRIVER_NAME
    FROM
    PAYMENTS  P JOIN TRIP_HISTORY T 
    ON P.TR_ID=T.TR_ID
		JOIN DRIVER D
		ON D.PLATE_NO=T.PLATE_NO
    WHERE USERNAME=:username
    ORDER BY T.TR_ID DESC
    `;


    const binds={
        
        username: username
    }
    
    try {
        const result = await database.execute(sql, binds, database.options);
        const rows = result.rows;
        console.log('db func hote: ',rows);
        return rows;
        // Process the result rows
    } catch (error) {
        console.error('Error executing SQL:', error);
    }
    
}

async function getPaymentsOfDriver(did) {
    const sql = `SELECT T.TR_ID AS TR_ID,TRANSACTION_NO,AMOUNT,PAYMENT_TIME,USERNAME--,D.ID AS D_ID
    FROM
    PAYMENTS  P JOIN TRIP_HISTORY T
    on P.TR_ID=T.TR_ID
    JOIN DRIVER D 
    ON D.PLATE_NO=T.PLATE_NO
    WHERE D.ID=:did
    ORDER BY T.TR_ID DESC
    `;

    const binds={
        did:did
    }
    
    try {
        const result = await database.execute(sql, binds, database.options);
        const rows = result.rows;
        console.log('db func hote: ',rows);
        return rows;
        // Process the result rows
    } catch (error) {
        console.error('Error executing SQL:', error);
    }
}


module.exports = {
    getPaymentDetails,
    getPaymentsOfUser,
    getPaymentsOfDriver
};