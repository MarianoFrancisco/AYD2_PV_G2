import express from "express"
import { getBalance } from "../controllers/account-controller.js"
import validateUser from '../middleware/validate-user-middleware.js';

const router = express.Router();
router.get("/show-balance", validateUser('query'), getBalance);

export default router;