import { Op } from 'sequelize';
import EmployeeTerminationsModel from '../models/employee-termination-model.js';
import UserModel from '../models/user-model.js';

/**
 * 1er Endpoint: Obtener usuarios que no están eliminados
 */
export const getUsersExcludingTerminated = async (req, res) => {
    try {
      // Obtener IDs de usuarios con status "Eliminado" en employee_terminations
      const terminatedUsers = await EmployeeTerminationsModel.findAll({
        where: { status: 'Eliminado' },
        attributes: ['id_user'],
      });
  
      const terminatedUserIds = terminatedUsers.map((entry) => entry.id_user);
  
      // Obtener todos los usuarios de la tabla `users`, excepto los eliminados
      const users = await UserModel.findAll({
        where: {
          id: { [Op.notIn]: terminatedUserIds }, // Excluir usuarios con status "Eliminado"
        },
        attributes: {
          exclude: [
            'password',
            'second_password_hash',
            'second_password_updated_at',
          ], // Excluir campos relacionados con contraseñas
        },
      });
  
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ocurrió un error al obtener los usuarios activos.' });
    }
  };
/**
 * 2do Endpoint: Registrar una terminación de empleado
 */
export const createEmployeeTermination = async (req, res) => {
    const { id_admin, id_user, reason, created_at } = req.body;
  
    try {
      // Validar que los datos necesarios estén presentes
      if (!id_admin || !id_user || !reason || !created_at) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
      }
  
      // Obtener datos del administrador con id_admin
      const admin = await UserModel.findOne({
        where: { id: id_admin },
        attributes: ['signature_path', 'name', 'phone', 'email'], // Campos necesarios
      });
  
      if (!admin) {
        return res.status(404).json({
          error: `No se encontró un administrador con ID ${id_admin}.`,
        });
      }
  
      // Insertar en la tabla employee_terminations
      const newTermination = await EmployeeTerminationsModel.create({
        id_user,
        reason,
        signature_admin: admin.signature_path, // Firma del administrador
        name_adm: admin.name,
        phone_adm: admin.phone,
        email_adm: admin.email,
        created_at,
        status: 'Pendiente', // Estado inicial
      });
  
      res.status(201).json({
        message: 'La terminación del empleado ha sido registrada exitosamente.',
        termination: newTermination,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ocurrió un error al registrar la terminación del empleado.' });
    }
  };

/**
 * 3er Endpoint: Cambiar estado de un empleado a "Eliminado"
 */
export const updateEmployeeTerminationStatus = async (req, res) => {
  const { id_user } = req.body;

  try {
    // Buscar la terminación por ID de usuario
    const termination = await EmployeeTerminationsModel.findOne({
      where: { id_user },
    });

    // Verificar si existe la terminación
    if (!termination) {
      return res.status(404).json({
        error: `No se encontró una terminación para el usuario con ID ${id_user}.`,
      });
    }

    // Actualizar el estado a "Eliminado"
    termination.status = 'Eliminado';
    await termination.save();

    res.status(200).json({
      message: `El estado de la terminación del usuario con ID ${id_user} ha sido actualizado a "Eliminado".`,
      termination,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocurrió un error al actualizar el estado de la terminación del empleado.' });
  }
};

/**
 * 4to Endpoint: Obtener todas las terminaciones de empleados
 */
export const getAllEmployeeTerminations = async (req, res) => {
    try {
      // Obtener todas las filas de la tabla employee_terminations
      const terminations = await EmployeeTerminationsModel.findAll();
  
      res.status(200).json(terminations);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ocurrió un error al obtener las terminaciones de empleados.' });
    }
  };