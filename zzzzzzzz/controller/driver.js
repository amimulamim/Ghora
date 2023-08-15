const Controller = require('./base').Controller;
const DriverRepository = require("../repository/driver").DriverRepository;
const driverRepository = new DriverRepository();

class DriverController extends Controller {
    constructor() {
        super();
    }

    list = async (req, res, next) => {
        let drivers = await driverRepository.findAll();
        if (!drivers.success)
            return res.status(500).json({code: "E0001", description: "Internal Error"});
        else
            return res.status(200).json(drivers.data);
    };
    fetch = async (req, res, next) => {
        let id = req.params.id;
        let id2=req.params.id2;
        if(!id2){
            id2=200;
        }
        let driver = await driverRepository.findOne(id,id2);
        if (!driver.success)
            return res.status(404).json({code: "E0002", description: "Internal Server Error"});
        else if (driver.data.length === 0)
            return res.status(500).json({code: "E0002", description: "driver with id:" + id + " not found."});
        else
            return res.status(200).json(driver.data);
    };
};


exports.DriverController = DriverController;

