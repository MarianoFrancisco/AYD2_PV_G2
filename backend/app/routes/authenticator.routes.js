import express from 'express';
import { 
    checkTwoFactorAuth, 
    validateSecondFactorByPassword, 
    validateSecondFactorByFile 
} from '../controllers/authenticator-controller.js';
import uploadSingleAydFile from '../middleware/file-middleware.js';

/*
 * @author
 * Mariano Camposeco {@literal (mariano1941@outlook.es)}
 */
const router = express.Router();

router.post('/check', checkTwoFactorAuth);

router.post('/validate/password', validateSecondFactorByPassword);

router.post('/validate/file', uploadSingleAydFile, validateSecondFactorByFile);


export default router;