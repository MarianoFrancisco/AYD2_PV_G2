import express from 'express';
import { getSecurityQuestionAndAnswer, blockCard } from '../controllers/card-block-controller.js';

const router = express.Router();

// Ruta para obtener pregunta y respuesta de seguridad
router.post('/security', getSecurityQuestionAndAnswer);

// Ruta para bloquear una tarjeta
router.post('/block', blockCard);

export default router;
