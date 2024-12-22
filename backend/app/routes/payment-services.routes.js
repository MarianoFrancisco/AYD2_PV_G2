import express from 'express';
import {
    createServicePaymentByCashier,
    createServicePaymentByAccount
} from '../controllers/payment-services-controller.js';
import validateUserById from '../middleware/validate-user-middleware.js';

/*
 * @author
 * Mariano Camposeco {@literal (mariano1941@outlook.es)}
 */
const router = express.Router();

router.post('/cashier', validateUserById('body'), createServicePaymentByCashier);

router.post('/account', validateUserById('body'), createServicePaymentByAccount);

export default router;