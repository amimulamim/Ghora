const router = require('express-promise-router')();

const AuthController = require('../../controller/driverauthentication').AuthController;
const authController=new AuthController();



router.get('/',authController.driverLoginGet);
router.post('/',authController.driverLoginByEmail);


router.delete('/',);
router.put('/',);

module.exports = router;