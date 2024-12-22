import express from "express";
import { createSurvey } from "../controllers/survey-create-controller.js";

const router = express.Router();

// Ruta para crear una encuesta
router.post("/", createSurvey);

export default router;
