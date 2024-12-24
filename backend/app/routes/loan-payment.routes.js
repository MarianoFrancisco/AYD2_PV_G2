/*
import express from 'express';
import {
    save
} from '../controllers/loan-payment-controller.js';
import validateUser from '../middleware/validate-user-middleware.js';



const router = express.Router();

router.post('', validateUser('body'), save);

export default router;
 */

import express from 'express';
import { save } from '../controllers/loan-payment-controller.js';

const router = express.Router();

// Ruta para registrar el pago de un préstamo
router.post('/', save);

export default router;
