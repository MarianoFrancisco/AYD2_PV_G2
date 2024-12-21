import express from "express"
import {
    getBalance,
    updateAccountInfo
} from "../controllers/account-controller.js"
import validateUserById from '../middleware/validate-user-middleware.js';

const router = express.Router();

router.get("/show-balance", validateUserById('query'), getBalance);
router.patch('/update', updateAccountInfo);

export default router;