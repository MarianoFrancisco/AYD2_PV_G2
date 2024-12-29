import express from 'express';
import {
  getCardsWithAccountDetails,
  updateCardStatus,
} from '../controllers/accept-card-controller.js';

const router = express.Router();

// Ruta para listar tarjetas con detalles de cuentas
router.get('/cards-with-accounts', getCardsWithAccountDetails);

// Ruta para actualizar el estado de una tarjeta
router.put('/card/:id', updateCardStatus);

export default router;