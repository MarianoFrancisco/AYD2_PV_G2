import express from "express";
import { updateCurrency } from "../controllers/update-currency-controller.js";

const router = express.Router();

router.put("/", updateCurrency);

export default router;
