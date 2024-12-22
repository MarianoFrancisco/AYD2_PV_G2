import SurveyModel from "../models/survey-model.js";

export const getSurveyList = async (req, res) => {
  try {
    // Obtener todos los datos de la tabla `surveys`
    const surveys = await SurveyModel.findAll();

    // Validar si existen encuestas
    if (!surveys || surveys.length === 0) {
      return res.status(404).json({
        message: "No se encontraron encuestas registradas.",
      });
    }

    // Retornar la lista de encuestas
    return res.status(200).json(surveys);
  } catch (error) {
    console.error("Error al obtener la lista de encuestas:", error);
    return res.status(500).json({
      message: "Ocurrió un error al obtener la lista de encuestas.",
    });
  }
};
