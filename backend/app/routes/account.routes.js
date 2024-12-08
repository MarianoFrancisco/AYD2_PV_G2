import express from "express"
import { getBalance } from "../controllers/account-controller.js"


const router = express.Router();
router.get("/ShowBalance/:accountNumber", getBalance);


export default router;

//router.put('/:id/close', protect, administratorProtect, closeBankAccount);
//router.put('/:id/activate', protect, administratorProtect, activateBankAccount);

// /:id -> parametro por ruta