import express from 'express';
import { getLoansByAccount } from '../controllers/loan-list-controller.js';

const router = express.Router();

// Ruta para obtener préstamos por account_id
router.get('/:account_number', getLoansByAccount);

export default router;
