import SurveyModel from "../models/survey-model.js";

export const createSurvey = async (req, res) => {
  const {
    account_id,
    category,
    score,
    comment,
    responded_at,
    answer1,
    answer2,
    answer3,
    answer4,
    answer5,
  } = req.body;

  try {
    // Insertar los datos de la encuesta con las preguntas fijas
    await SurveyModel.create({
      account_id,
      category,
      score,
      comment,
      responded_at,
      Question1: "¿Qué tan satisfecho estás con la atención brindada?",
      Answer1: answer1,
      Question2:
        "¿Recomendarías nuestros productos financieros (cuentas, tarjetas, préstamos) a familiares o amigos?",
      Answer2: answer2,
      Question3:
        "¿Qué tan fácil fue realizar transacciones utilizando nuestra banca en línea?",
      Answer3: answer3,
      Question4:
        "¿Cómo calificarías la claridad y precisión de la información proporcionada por nuestros agentes?",
      Answer4: answer4,
      Question5:
        "¿Qué mejoras te gustaría ver en nuestros servicios bancarios?",
      Answer5: answer5,
    });

    // Responder con un mensaje de éxito
    return res.status(200).json({ message: "Encuesta realizada correctamente." });
  } catch (error) {
    console.error("Error al crear la encuesta:", error);
    return res.status(500).json({ error: "Ocurrió un error al crear la encuesta." });
  }
};
