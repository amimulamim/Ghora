const router = require('express-promise-router')();

const DriverController = require('../controller/driver').DriverController;

let controller = new DriverController();

router.get('/all',controller.list);
router.get('/:id',controller.fetch);


router.delete('/',);
router.put('/',);

module.exports = router;