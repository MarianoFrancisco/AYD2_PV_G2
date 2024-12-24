import express from 'express';
import { createDeposit } from '../controllers/deposit-controller.js';

const router = express.Router();

// Ruta para realizar un depósito
router.post('', createDeposit);

export default router;