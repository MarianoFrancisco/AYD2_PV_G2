/*
import ComplaintModel from "../models/complaints-model.js";

export const getComplaintList = async (req, res) => {
  try {
    // Obtener todas las quejas de la tabla `complaints`
    const complaints = await ComplaintModel.findAll();

    // Validar si existen quejas
    if (!complaints || complaints.length === 0) {
      return res.status(404).json({
        message: "No se encontraron quejas registradas.",
      });
    }

    // Retornar la lista de quejas
    return res.status(200).json(complaints);
  } catch (error) {
    console.error("Error al obtener la lista de quejas:", error);
    return res.status(500).json({
      message: "Ocurrió un error al obtener la lista de quejas.",
    });
  }
};
*/

import ComplaintModel from "../models/complaints-model.js";
import AccountModel from "../models/account-model.js";

export const getComplaintList = async (req, res) => {
  try {
    // Obtener todas las quejas de la tabla `complaints`
    const complaints = await ComplaintModel.findAll();

    // Validar si existen quejas
    if (!complaints || complaints.length === 0) {
      return res.status(404).json({
        message: "No se encontraron quejas registradas.",
      });
    }

    // Crear una lista donde se guardarán las quejas con los datos de las cuentas
    const complaintList = [];

    // Iterar sobre cada queja y buscar los datos de la cuenta correspondiente
    for (const complaint of complaints) {
      const account = await AccountModel.findOne({
        where: { id: complaint.account_id },
        attributes: ["account_number", "cui", "name", "last_name", "phone", "email", "age"], // Seleccionar solo los campos requeridos
      });

      if (account) {
        // Combinar los datos de la queja con los datos de la cuenta
        complaintList.push({
          ...complaint.toJSON(), // Convertir la queja a un objeto plano
          ...account.toJSON(), // Añadir los datos de la cuenta
        });
      } else {
        // Si no se encuentra la cuenta, puedes manejarlo de esta forma
        console.warn(`Cuenta con ID ${complaint.account_id} no encontrada.`);
      }
    }

    // Retornar la lista combinada de quejas
    return res.status(200).json(complaintList);
  } catch (error) {
    console.error("Error al obtener la lista de quejas:", error);
    return res.status(500).json({
      message: "Ocurrió un error al obtener la lista de quejas.",
    });
  }
};

