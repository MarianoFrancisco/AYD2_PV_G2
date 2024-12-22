import express from "express";
import { getSurveyList } from "../controllers/list-survey-controller.js";

const router = express.Router();

// Ruta para obtener la lista de encuestas
router.get("/", getSurveyList);

export default router;
