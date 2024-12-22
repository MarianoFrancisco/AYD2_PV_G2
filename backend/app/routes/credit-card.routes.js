import express from 'express';
import { getCreditCards } from '../controllers/credit-card-controller.js';

const router = express.Router();

// Ruta para obtener tarjetas de crédito por account_id
router.get('/:account_id', getCreditCards);

export default router;