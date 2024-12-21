import express from 'express';
import {
    updateUserRole
} from '../controllers/user-controller.js';

/*
 * @author
 * Mariano Camposeco {@literal (mariano1941@outlook.es)}
 */
const router = express.Router();

router.patch('/role', updateUserRole);

export default router;