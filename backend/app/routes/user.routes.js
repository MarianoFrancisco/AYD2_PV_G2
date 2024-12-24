import express from 'express';
import {
    getAllUsers,
    updateUserRole
} from '../controllers/user-controller.js';

/*
 * @author
 * Mariano Camposeco {@literal (mariano1941@outlook.es)}
 */
const router = express.Router();

router.get('', getAllUsers);
router.patch('/role', updateUserRole);

export default router;