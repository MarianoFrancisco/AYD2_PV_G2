import express from 'express';
import {
  getUsersExcludingTerminated,
  createEmployeeTermination,
  updateEmployeeTerminationStatus,
  getAllEmployeeTerminations,
} from '../controllers/employee-termination-controller.js';

const router = express.Router();

// Ruta para obtener usuarios activos
router.get('/active-users', getUsersExcludingTerminated);

// Ruta para registrar una terminación de empleado
router.post('/employee-termination', createEmployeeTermination);

// Ruta para actualizar el estado de terminación de un empleado
router.put('/employee-termination/status', updateEmployeeTerminationStatus);

// Ruta para obtener empleados terminados
router.get('/get-employee-termination', getAllEmployeeTerminations);

export default router;
