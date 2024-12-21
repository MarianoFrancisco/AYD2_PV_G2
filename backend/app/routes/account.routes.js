import express from "express"
import {
    getBalance,
    getSecurityQuestionByAccountNumber,
    getPhotographyPathByAccountNumber,
    updateAccountInfo
} from "../controllers/account-controller.js"
import validateUserById from '../middleware/validate-user-middleware.js';
import imageUpload from '../middleware/image-middleware.js';
import uploadImageHandler from '../handlers/upload-image-handler.js';

/*
 * @author
 * Mariano Camposeco {@literal (mariano1941@outlook.es)}
 */
const router = express.Router();

router.get("/show-balance", validateUserById('query'), getBalance);
router.get('/security-question', getSecurityQuestionByAccountNumber);
router.get('/photography', getPhotographyPathByAccountNumber);
router.patch('/update', imageUpload.single('photo'), uploadImageHandler, updateAccountInfo);

export default router;