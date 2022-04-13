const express = require('express');
const router = express.Router();

const {validate} = require('../middlewares/runValidation');
const {protect,authorize} = require('../middlewares/authMiddleware');
const {IncommingServiceRequest,requestedServiceByUser, getAllRequestedService,approveRequestedService,viewAcceptedService} = require('../controllers/serviceRequestController');

router.post('/request',protect,authorize('user'),IncommingServiceRequest);
router.get('/requested-service-by-user',protect,authorize('user'),requestedServiceByUser);
router.get('/requested-service-list',protect,authorize('admin','professional'),getAllRequestedService);
router.put('/approve-requested-service/:id',protect,authorize('professional'),approveRequestedService);
router.get('/view-accepted-services',protect,authorize('user'),viewAcceptedService);



module.exports = router;

