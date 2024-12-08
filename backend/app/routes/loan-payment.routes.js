import express from 'express';
import {
    save
} from '../controllers/loan-payment-controller.js';
import validateUser from '../middleware/validate-user-middleware.js';

/*
 * @author
 * Mariano Camposeco {@literal (mariano1941@outlook.es)}
 */
const router = express.Router();

router.post('', validateUser('body'), save);

export default router;