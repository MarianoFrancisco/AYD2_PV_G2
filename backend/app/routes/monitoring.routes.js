import express from "express";
import { 
    getRetirosWithAccountData, 
    getLoansWithAccountData, 
    sendAlarmEmail 
} from "../controllers/monitoring-controller.js";

const router = express.Router();

// Rutas para los endpoints
router.get("/retiros", getRetirosWithAccountData);
router.get("/prestamos", getLoansWithAccountData);
router.post("/alarma", sendAlarmEmail);

export default router;
