import express from "express"
import {
    getBalance,
    getSecurityQuestionByAccountNumber,
    getPhotographyPathByAccountNumber,
    updateAccountInfo,
    createAccount,
    registroQuejas,
    createEmployee
} from "../controllers/account-controller.js"
import validateUserById from '../middleware/validate-user-middleware.js';
import imageUpload from '../middleware/image-middleware.js';
import uploadImageHandler from '../handlers/upload-image-handler.js';
import pdfUpload from "../middleware/pdf-middleware.js";
import uploadPdfhandler from "../handlers/upload-pdf-handler.js";
import upload from "../middleware/uploadfiles.js";
/*
 * @author
 * Mariano Camposeco {@literal (mariano1941@outlook.es)}
 */
const router = express.Router();

router.get("/show-balance", validateUserById('query'), getBalance);
router.get('/security-question', getSecurityQuestionByAccountNumber);
router.get('/photography', getPhotographyPathByAccountNumber);
router.post("/createAccount", imageUpload.single('photo'), uploadImageHandler, createAccount)
router.get("/registrarQueja", imageUpload.single('photo'), registroQuejas)
router.post("/registrarEmpleado", upload.fields([
    { name: 'photo', maxCount: 1 }, // Campo 'photo', máximo 1 archivo
    { name: 'pdf', maxCount: 1 }    // Campo 'pdf', máximo 1 archivo
]),
uploadImageHandler,
uploadPdfhandler,
createEmployee)
router.patch('/update', imageUpload.single('photo'), uploadImageHandler, updateAccountInfo);


export default router;