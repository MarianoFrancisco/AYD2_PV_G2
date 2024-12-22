import express from 'express';
import { payCreditCard } from '../controllers/pay-credit-card-controller.js';

const router = express.Router();

// Ruta para pagar la tarjeta de crédito
router.post('/', payCreditCard);

export default router;
