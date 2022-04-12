const express = require('express');
const router = express.Router();

const {validate} = require('../middlewares/runValidation');
const {protect,authorize} = require('../middlewares/authMiddleware');
const {IncommingServiceRequest,requestedServiceByUser, getAllRequestedService} = require('../controllers/serviceRequestController');

router.post('/request',protect,IncommingServiceRequest);
router.get('/requested-service-by-user',protect,requestedServiceByUser);
router.get('/requested-service-list',protect,getAllRequestedService);



module.exports = router;
