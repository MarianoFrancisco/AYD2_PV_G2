import SurveyModel from "../models/survey-model.js";

export const getSurveyQuestions = async (req, res) => {
  try {
    // Buscar la encuesta para el account_id = 1
    const survey = await SurveyModel.findOne({
      where: { account_id: 1 },
      attributes: ['Question1', 'Question2', 'Question3', 'Question4', 'Question5'],
    });

    // Verificar si la encuesta existe
    if (!survey) {
      return res.status(404).json({ error: "No se encontraron preguntas para este account_id" });
    }

    // Retornar solo las preguntas
    const { Question1, Question2, Question3, Question4, Question5 } = survey;
    return res.status(200).json({
      Question1,
      Question2,
      Question3,
      Question4,
      Question5
    });
  } catch (error) {
    console.error("Error al obtener las preguntas de la encuesta:", error);
    return res.status(500).json({ error: "Error al obtener las preguntas" });
  }
};
