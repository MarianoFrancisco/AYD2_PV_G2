import express from 'express';
import {
  getUsersExcludingTerminated,
  createEmployeeTermination,
  updateEmployeeTerminationStatus,
} from '../controllers/employee-termination-controller.js';

const router = express.Router();

// Ruta para obtener usuarios activos
router.get('/active-users', getUsersExcludingTerminated);

// Ruta para registrar una terminación de empleado
router.post('/employee-termination', createEmployeeTermination);

// Ruta para actualizar el estado de terminación de un empleado
router.put('/employee-termination/status', updateEmployeeTerminationStatus);

export default router;
