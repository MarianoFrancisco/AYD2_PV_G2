import express from "express";
import { getComplaintList } from "../controllers/list-complaints-controller.js";

const router = express.Router();

// Ruta para obtener la lista de quejas
router.get("/", getComplaintList);

export default router;