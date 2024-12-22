import express from 'express';
import {
    getAccountByNumber,
    getAccountsByCUI
} from '../controllers/client-controller.js';

/*
 * @author
 * Mariano Camposeco {@literal (mariano1941@outlook.es)}
 */
const router = express.Router();

router.get('/account/by-number', getAccountByNumber);
router.get('/accounts/by-cui', getAccountsByCUI);

export default router;
