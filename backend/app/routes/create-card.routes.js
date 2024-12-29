import express from "express";
import { createCard } from "../controllers/create-card-controller.js";

const router = express.Router();

// Ruta para crear una tarjeta
router.post("/", createCard);

export default router;