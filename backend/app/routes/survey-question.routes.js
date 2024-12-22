import express from 'express';
import { getSurveyQuestions } from '../controllers/survey-question-controller.js';

const router = express.Router();

// Ruta para obtener las preguntas de la encuesta para account_id = 1
router.get('/', getSurveyQuestions);

export default router;

