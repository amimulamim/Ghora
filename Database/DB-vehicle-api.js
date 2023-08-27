const database = require('./database');

async function addNewVehicle(vehicle){
    const sql = `
    INSERT INTO
        VEHICLE(PLATE_NO,MODELNAME,PLAN_ID)
    VALUES 
        (:plate,:model,:plan)
        `;
    const binds = {
        plate:vehicle.plate,
        model:vehicle.model,
        plan:vehicle.plan
    }
    return (await database.execute(sql, binds, database.options)).rows;
}
async function deleteVehicle(plate){
    const sql = `
    DELETE FROM
        VEHICLE
    WHERE
        PLATE_NO=:plate
        `;
    const binds = {
        plate:plate
    }
    return (await database.execute(sql, binds, database.options)).rows;
}


async function editVehicleInfo(vehicle){
    const sql = `
    UPDATE VEHICLE
    SET 
        PLATE_NO=:plate,
        MODELNAME=:model,
        PLAN_ID=FLOOR(1+RAND()*200)
    WHERE ID=:id
        `;
    const binds = {
        id:vehicle.id,
        model:vehicle.model,
        plate:vehicle.plate
    }
    return await database.execute(sql, binds,{});
}

module.exports={
    addNewVehicle,
    deleteVehicle,
    editVehicleInfo
}