import express from 'express';
import { createWithdrawal } from '../controllers/withdrawal-controller.js';

const router = express.Router();

// Ruta para realizar un retiro
router.post('/', createWithdrawal);

export default router;