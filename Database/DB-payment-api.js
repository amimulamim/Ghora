const database=require('./database');

async function getPaymentDetails(tid){
    const sql= `
    SELECT 
        TR_ID,
        TRANSACTION_NO,
        AMOUNT,
        CONVERT_TO_GMT6(PAYMENT_TIME) AS WHEN,
		W.ID AS WALLET_ID
				
    FROM 
        PAYMENTS P NATURAL JOIN TRIP_HISTORY T
				JOIN WALLET W 
				ON W.ID=(SELECT WALLET_ID FROM USERS WHERE USERNAME=T.USERNAME)
        WHERE TR_ID=:id
    `;
    const binds={
        id:tid
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
async function getPaymentsOfUser(username){

    const sql = `SELECT T.TR_ID AS TR_ID,TRANSACTION_NO,ROUND(AMOUNT,2) AS AMOUNT,PAYMENT_TIME,USERNAME,D.NAME AS DRIVER_NAME
    FROM
    PAYMENTS  P JOIN TRIP_HISTORY T 
    ON P.TR_ID=T.TR_ID
		JOIN DRIVER D
		ON GETDRIVERIDFROMPLATE(T.PLATE_NO)=D.ID
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
    ON GETDRIVERIDFROMPLATE(T.PLATE_NO)=D.ID
    --D.PLATE_NO=T.PLATE_NO
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