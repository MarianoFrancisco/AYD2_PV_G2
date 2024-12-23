import express from "express";
import { getCapitalTotal, getEntradasYSalidas } from "../controllers/inventory-controller.js";

const router = express.Router();

// Ruta para el endpoint de Capital Total
router.get("/capital-total", getCapitalTotal);

// Ruta para el endpoint de Entradas y Salidas
router.get("/entradas-salidas", getEntradasYSalidas);

export default router;
