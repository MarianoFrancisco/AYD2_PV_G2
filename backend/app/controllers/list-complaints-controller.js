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
