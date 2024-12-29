import express from "express"
import {
    getRequestChangePasword,
    getRequestChangInfo,
    requestCancelSolicitud, 
    sendRequestChangeInfo, 
    sendRequestChangePassword, 
    sendrequestPrestamo
} from "../controllers/requests-controller.js"
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



router.post("/cancelService", imageUpload.single('photo'), requestCancelSolicitud)
router.post("/requestLoan",
    upload.fields([
        { name: 'pdf', maxCount: 1 },
    ]),
    uploadFilesHandler,
    sendrequestPrestamo)
router.post("/sendRequstChangePassword", imageUpload.single('photo'), sendRequestChangePassword),
router.post("/sendRequestChangeInfo", imageUpload.single('photo'), sendRequestChangeInfo),
router.get("/getRequestChangePassword",imageUpload.single('photo'),  getRequestChangePasword),
router.get("/getRequestChangeInfo",imageUpload.single('photo'),  getRequestChangInfo)

export default router;