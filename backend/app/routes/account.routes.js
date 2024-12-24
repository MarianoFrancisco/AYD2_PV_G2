import express from "express"
import {
    getBalance,
    getSecurityQuestionByAccountNumber,
    getPhotographyPathByAccountNumber,
    updateAccountInfo,
    createAccount,
    registroQuejas,
    createEmployee,
    createAdmin
} from "../controllers/account-controller.js"
import validateUserById from '../middleware/validate-user-middleware.js';
import imageUpload from '../middleware/image-middleware.js';
import uploadImageHandler from '../handlers/upload-image-handler.js';
import uploadFilesHandler from "../handlers/upload-files.handler.js";
import upload from "../middleware/files-middleware.js";
/*
 * @author
 * Mariano Camposeco {@literal (mariano1941@outlook.es)}
 */
const router = express.Router();

router.get("/show-balance", validateUserById("query"), getBalance);
router.get('/security-question', getSecurityQuestionByAccountNumber);
router.get('/photography', getPhotographyPathByAccountNumber);
router.post("/createAccount", imageUpload.single('photo'), uploadImageHandler, createAccount)
router.post("/registrarQueja", imageUpload.single('photo'), registroQuejas)
router.post("/registrarEmpleado",
    upload.fields([
        { name: 'photo', maxCount: 1 },
        { name: 'pdf', maxCount: 1 },
    ]),
    uploadFilesHandler,
    createEmployee)
router.post('/registrarAdmin',
    upload.fields([
        { name: 'photo', maxCount: 1 },
        { name: 'pdf', maxCount: 1 },
    ]),
    uploadFilesHandler,
    createAdmin)
router.patch('/update', imageUpload.single('photo'), uploadImageHandler, updateAccountInfo);


export default router;