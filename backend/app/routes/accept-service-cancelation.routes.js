import express from 'express';
import {
    getAllServiceCancellations,
    updateServiceCancellationStatus,
} from '../controllers/accept-service-cancelation-controller.js';

const router = express.Router();

// Ruta para obtener usuarios activos
router.get('/get-all-services', getAllServiceCancellations);

// Ruta para registrar una terminación de empleado
router.post('/accept-service-cancelation', updateServiceCancellationStatus);

export default router;