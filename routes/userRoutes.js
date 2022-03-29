const express = require('express');
const router = express.Router();

const {register} = require('../controllers/userController');
const {userRegistrationValidator} = require('../validators/userValidator');
const {validate} = require('../middlewares/runValidation');

router.post('/register',userRegistrationValidator,validate, register);

module.exports = router;