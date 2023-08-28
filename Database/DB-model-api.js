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

async function modelInfo(name){
    const sql = `
   SELECT 
        NAME,V_TYPE,MANUFACTURER
        FROM 
        MODEL
    WHERE
        NAME=:name
        `;
    const binds = {
        name:name
    }
    return (await database.execute(sql, binds,database.options)).rows;
}

module.exports={
    addNewModel,
    modelInfo
}