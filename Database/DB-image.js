const database = require('./database');


async function getImageOfUser(username) {
    const sql = `SELECT USERNAME,GETIMAGEOFUSER(:username) AS IMAGE
    FROM  USERS
    WHERE USERNAME=:username
    `;
    const binds={
        username: username
    }
    try {
        const result = await database.execute(sql, binds, database.options);
        const rows = result.rows;
      //  console.log('pool er jonno database theke  : ',rows);
        return rows;
        // Process the result rows
    } catch (error) {
        console.error('Error executing SQL while login info newa:', error);
    }




}

async function setImageOfUser(username,photoname){
    const sql = `
    UPDATE USERS SET IMAGE=:photo WHERE username=:username
    `;
    const binds={
        photo:photoname,
        username: username
    };

    try {
        const result = await database.execute(sql, binds, database.options);
        const rows = result.rows;
      //  console.log('pool er jonno database theke  : ',rows);
        return rows;
        // Process the result rows
    } catch (error) {
        console.error('Error executing SQL while login info newa:', error);
    }



}


async function setImageOfDriver(did,photoname){
    const sql = `
    UPDATE DRIVER SET IMAGE=:photo WHERE ID=:did
    `;
    const binds={
        photo:photoname,
        did:did
    };

    try {
        const result = await database.execute(sql, binds, database.options);
        const rows = result.rows;
      //  console.log('pool er jonno database theke  : ',rows);
        return rows;
        // Process the result rows
    } catch (error) {
        console.error('Error executing SQL while login info newa:', error);
    }



}





async function getImageOfDriver(did) {
    const sql = `SELECT ID,GETIMAGEOFDRIVER(:did) AS IMAGE
    FROM  DRIVER
    WHERE ID=:did
    `;
    const binds={
        did:did
    }
    try {
        const result = await database.execute(sql, binds, database.options);
        const rows = result.rows;
      //  console.log('pool er jonno database theke  : ',rows);
        return rows;
        // Process the result rows
    } catch (error) {
        console.error('Error executing SQL while login info newa:', error);
    }




}

async function getImageOfDriver(plate) {
    const sql = `SELECT ID,GETIMAGEOFDRIVER(ID) AS IMAGE
    FROM  DRIVER
    WHERE ID=GETDRIVERIDFROMPLATE(:plate)
    `;
    const binds={
        plate:plate
    }
    try {
        const result = await database.execute(sql, binds, database.options);
        const rows = result.rows;
      //  console.log('pool er jonno database theke  : ',rows);
        return rows;
        // Process the result rows
    } catch (error) {
        console.error('Error executing SQL while login info newa:', error);
    }




}


// function to get id from email
module.exports={
    getImageOfDriver,
    getImageOfUser,
    setImageOfDriver,
    setImageOfUser
}