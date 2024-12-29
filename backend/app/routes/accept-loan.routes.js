import express from 'express';
import {
  validateLoanRequests,
  getLoanRequestsWithAccountDetails,
  updateLoanRequestStatus,
} from '../controllers/accept-loan-controller.js';

const router = express.Router();

// Ruta para validar y actualizar estados de solicitudes
router.get('/validate-loan-requests', validateLoanRequests);

// Ruta para obtener solicitudes con datos de cuentas
router.get('/loan-requests-with-details', getLoanRequestsWithAccountDetails);

router.put('/loan-request/:id', updateLoanRequestStatus);

export default router;
