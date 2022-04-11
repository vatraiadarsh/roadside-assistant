const express = require('express');
const router = express.Router();

const {register,login, getProfile,updateProfile, getAllUsers} = require('../controllers/userController');
const {userRegistrationValidator,userLoginValidator} = require('../validators/userValidator');
const {validate} = require('../middlewares/runValidation');
const {protect,authorize} = require('../middlewares/authMiddleware');

router.post('/register',userRegistrationValidator,validate, register);
router.post('/login',userLoginValidator,validate, login);
router.get('/profile',protect, getProfile,);
router.put('/profile',protect, updateProfile);
router.get('/users', getAllUsers);



module.exports = router;