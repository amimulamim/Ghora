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
    return await database.execute(sql, binds, {});
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


async function editVehicleInfo(vehicle){
    const sql = `
    UPDATE VEHICLE
    SET 
        PLATE_NO=:plate,
        MODELNAME=:model,
        PLAN_ID=1
    WHERE ID=:id
        `;
    const binds = {
        id:vehicle.id,
        model:vehicle.model,
        plate:vehicle.plate
    }
    console.log('success');
    return await database.execute(sql, binds,{});
}

async function vehicleInfo(plate){
    const sql = `
    SELECT 
    V.ID VID,
    V.PLATE_NO PNO,
    V.MODELNAME MNAME,
    V.PLAN_ID PID,
    M.V_TYPE TYPE,
    M.MANUFACTURER COMPANY,
            D.ID AS DID,
            D.NAME AS DNAME
FROM 
    VEHICLE V JOIN MODEL M
    ON(UPPER(V.MODELNAME)=UPPER(M.NAME))
            JOIN DRIVER D 
            ON V.PLATE_NO=D.PLATE_NO
WHERE
    V.PLATE_NO=:plate
        `;
    const binds = {
        plate:plate
    }
    return (await database.execute(sql, binds,database.options)).rows;
}

module.exports={
    addNewVehicle,
    deleteVehicle,
    editVehicleInfo,
    vehicleInfo
}