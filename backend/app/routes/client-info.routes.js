import express from 'express';
import { getClientInfo } from '../controllers/client-info-controller.js'; // Importa el controlador

const router = express.Router();

// Endpoint para obtener la información del cliente por account_number o cui
router.get('/get-client-info', getClientInfo);

export default router;
