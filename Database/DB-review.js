const database = require('./database');


// function to get id from email
// async function makeReview(review)
// {
// const sql = `
// INSERT INTO 
// REVIEW(RATING,DESCRIPTION,TR_ID)
// VALUES(:rating,:comment,:tid)

// `;
// const binds={
//     rating:review.RATING,
//     comment:review.COMMENT,
//     tid:review.TR_ID
// };
// return (await database.execute(sql, binds, database.options)).rows;
// }


async function makeReview(review){
    const sql= `
    INSERT INTO
    REVIEW(RATING,DESCRIPTION,TR_ID)
    VALUES(:rating,:description,:tid)

    `;
    const binds={
        rating:review.RATING,
        description:review.COMMENT,
        tid:review.TR_ID
    
    };
   // return (await database.execute(sql,binds,database.options)).rows;
   try {
    const result = await database.execute(sql, binds, database.options);
    const rows = result.rows;
    return rows;
    // Process the result rows
} catch (error) {
    console.error('Error executing SQL:', error);
}


}

async function getAverageRating(d_id){
const sql = `
SELECT 
T.PLATE_NO AS PLATE_NO,
SUM(R.RATING)/COUNT(DISTINCT R.ID) AS AVG_RATING
FROM TRIP_HISTORY T NATURAL JOIN REVIEW R
WHERE T.PLATE_NO=(SELECT PLATE_NO FROM DRIVER WHERE ID=:d_id)
GROUP BY T.PLATE_NO
`;

const binds={
    d_id:d_id
};
//return (database.execute(sql,binds,database.options)).rows;
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


async function getRatingOfTrip(tr_id){
    const sql = `
    SELECT 
    RATING,DESCRIPTION
    FROM REVIEW
    WHERE TR_ID=:tr_id
    `;
    
    const binds={
        tr_id:tr_id
    };
    //return (database.execute(sql,binds,database.options)).rows;
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
    
    makeReview,
    getAverageRating,
    getRatingOfTrip
};