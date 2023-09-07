const database = require('./database');

async function addNewModel(model){
    const sql = `
    INSERT INTO
        MODEL(NAME,V_TYPE,MANUFACTURER)
    VALUES 
        (:name,:type,:company)
        `;
    const binds = {
        name:model.name,
        type:model.type,
        company:model.company
    }
    return (await database.execute(sql, binds, database.options)).rows;
}

async function vehicle_details(plate_no){
    // const sql=`SELECT (MANUFACTURER||' '||NAME) AS V_DETAILS
    // FROM MODEL
    // WHERE NAME=
    // (SELECT MODELNAME FROM VEHICLE
    // WHERE PLATE_NO=:plate)`;
    const sql=`
    SELECT PLATE_NO,MODEL_DETAILS(PLATE_NO) AS V_DETAILS
FROM VEHICLE 
WHERE PLATE_NO=:plate`;
    const binds = {
        plate:plate_no
    }
    return (await database.execute(sql, binds,database.options)).rows;
}


async function getVTypeByID(id){
    const sql=`
    SELECT ID,GETVTYPEBYID(id) AS V_TYPE
    FROM DRIVER
    WHERE ID=:id`;
    const binds = {
        id:id
    }
    return (await database.execute(sql, binds,database.options)).rows;
}

async function modelInfo(name){
    const sql = `
   SELECT 
        NAME,V_TYPE,MANUFACTURER
        FROM 
        MODEL
    WHERE
        UPPER(NAME)=UPPER(:name)
        `;
    const binds = {
        name:name
    }
    return (await database.execute(sql, binds,database.options)).rows;
}

module.exports={
    addNewModel,
    modelInfo,
    vehicle_details,
    getVTypeByID
}