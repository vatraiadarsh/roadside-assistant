const express = require('express');
const router = express.Router();

const {register,login, profile} = require('../controllers/userController');
const {userRegistrationValidator,userLoginValidator} = require('../validators/userValidator');
const {validate} = require('../middlewares/runValidation');
const {protect,authorize} = require('../middlewares/authMiddleware');

router.post('/register',userRegistrationValidator,validate, register);
router.post('/login',userLoginValidator,validate, login);
router.get('/profile',protect ,profile);



module.exports = router;