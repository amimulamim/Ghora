const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router({ mergeParams: true });
//my modules
const DB_driver_edit = require('../../../Database/DB-driver-edit-api');
const DB_auth_driver = require('../../../Database/DB-driver-auth-api');
const DB_vehicle_api = require('../../../Database/DB-vehicle-api');
const DB_model_api = require('../../../Database/DB-model-api');
const authUtils = require('../../../utils/auth-utils');

router.get('/', async (req, res) => {
    // check if already logged in
    if (req.driver == null) {
        res.redirect('/driver/login');
    }
    console.log('etai driver', req.driver);
    let driverVehicleInfo, driverInfo, errors = [];
    driverInfo = await DB_auth_driver.getLoginInfoByID(req.driver.ID);
    driverVehicleInfo = await DB_vehicle_api.vehicleInfo(driverInfo[0].PLATE_NO);
    if (driverVehicleInfo.length === 0) {
        res.render('driverlayout.ejs', {
            title: 'Edit Profile - Ghora',
            page: ['driverVehicleEdit'],
            driver: req.driver,
            errors: errors,
            form: {
                plate: '',
                model: '',
                company: '',
                type: ''
            }
        });

    } else {
        console.log('etaaaaaaaaaaaaaaa', driverInfo[0]);
        res.render('driverlayout.ejs', {
            title: 'Edit Profile - Ghora',
            page: ['driverVehicleEdit'],
            driver: req.driver,
            errors: errors,
            form: {
                plate: driverVehicleInfo[0].PNO,
                model: driverVehicleInfo[0].MNAME,
                company: driverVehicleInfo[0].COMPANY,
                type: driverVehicleInfo[0].TYPE
            }
        });
    }

});

router.post('/', async (req, res) => {
    if (req.driver == null) {
        return res.redirect('/driver/login');
    }

    console.log(req.body);
    let result1,result2, errors = [];
    result1 = await DB_model_api.modelInfo(req.body.model);
    result2 = await DB_vehicle_api.vehicleInfo(req.body.plate);
    console.log("model info: " ,result1);
    console.log("vehicle info: " ,result2);
    if (result2.length == 0) {
        if (result1.length == 0) {
            let model = {
                name: req.body.model,
                company: req.body.company,
                type: req.body.type
            }
            let ins = await DB_model_api.addNewModel(model);
            console.log("model inserted: " );
        }
        else {
            if (result1[0].MANUFACTURER.toUpperCase() != req.body.company.toUpperCase() || result1[0].V_TYPE.toUpperCase() != req.body.type.toUpperCase()) {
                errors.push('Wrong credentials about model');
            }
        }

    }
    else {
        if(req.driver.ID!=result2[0].DID)
       {console.log('plate already exists');
        errors.push('plate already exists');}
    }


    // if (results.length > 0)
    //     errors.push('You can,t change email');
    // if(req.body.password!=req.body.password2)
    //     errors.push('PASSWORDS MUST MATCH');
    // if(req.body.phone.length!=13)
    //     errors.push('Phone no must start with 8801');
    if (errors.length > 0) {
        res.render('driverlayout.ejs', {
            title: 'Edit Profile - Ghora',
            page: ['driverVehicleEdit'],
            driver: req.driver,
            errors: errors,
            form: {
                plate: req.body.plate,
                model: req.body.model,
                company: req.body.company,
                type: req.body.type
            }
        });
    } else {


        // await bcrypt.hash(driver.password, 8, async (err, hash) => {
        //     if (err) {
        //         console.log("ERROR hashing password");
        //     } else {
        //         driver.password = hash;
        console.log('kkkkkkk', req.driver.EMAIL);
        // console.log(vehicle);
        let driverInfo = await DB_auth_driver.getLoginInfoByID(req.driver.ID);
        let vehicleInfo = await DB_vehicle_api.vehicleInfo(driverInfo[0].PLATE_NO);
       
        if (driverInfo[0].PLATE_NO== null) {
            
            let vehicle = {
                plate: req.body.plate,
                model: req.body.model,
                plan: 1
                // company: req.body.company,
                // type: req.body.type

            }
            console.log('ei plate er vehicle nai',vehicle);
            let ad = await DB_vehicle_api.addNewVehicle(vehicle);

        } else {

            let vehicle = {
                id: vehicleInfo[0].VID,
                plate: req.body.plate,
                model: req.body.model,
                plan:1
                // company: req.body.company,
                // type: req.body.type

            }
            console.log('ki hoilo bae',vehicle);
           
            //let r = await DB_vehicle_api.editVehicleInfo(vehicle);
            let v=await  DB_vehicle_api.addNewVehicle(vehicle);
            console.log('ki hoilo ');

        }
        console.log('eto tuku success');
        const oldplate=DB_auth_driver.getLoginInfoByID(req.driver.ID);

        let r2 = await DB_driver_edit.editVehiclePlate(req.driver.ID, req.body.plate);
        // if(driverInfo[0].PLATE_NO!=null){
        //     await DB_driver_edit.deleteOldVehicle(driverInfo[0].PLATE_NO);
        // }

        //let result2 = await DB_auth_driver.getLoginInfoByEmail(driver.email);
        // login the user too
        //await DB_cart.addNewCart(result2[0].ID);
        //await authUtils.loginDriver(res, result2[0].EMAIL)
        // redirect to home page
        //res.redirect(`/profile/${user.handle}/settings`);
      
        res.redirect('/driver/info');

        //     }
        // });
    }

});

module.exports = router;