const express = require('express');
const router = express.Router();

const {validate} = require('../middlewares/runValidation');
const {protect,authorize} = require('../middlewares/authMiddleware');
const {IncommingServiceRequest,requestedService} = require('../controllers/serviceRequestController');

router.post('/serviceRequest',protect,IncommingServiceRequest);
router.get('/serviceRequested',protect,requestedService);



module.exports = router;