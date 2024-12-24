import express from 'express';
import {
    generateBackup,
} from '../controllers/database-controller.js';

/*
 * @author
 * Mariano Camposeco {@literal (mariano1941@outlook.es)}
 */
const router = express.Router();

router.post('/backup', generateBackup );

export default router;
