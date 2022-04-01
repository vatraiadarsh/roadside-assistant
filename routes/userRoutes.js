const express = require('express');
const router = express.Router();

const {register,login} = require('../controllers/userController');
const {userRegistrationValidator,userLoginValidator} = require('../validators/userValidator');
const {validate} = require('../middlewares/runValidation');

router.post('/register',userRegistrationValidator,validate, register);
router.post('/login',userLoginValidator,validate, login);


module.exports = router;