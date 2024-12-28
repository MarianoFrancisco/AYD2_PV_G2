import express from "express"
import { reporte_prestamos, 
    reporte_solicitudes, 
    reporte_transacciones
} from "../controllers/reportes-controller.js";
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



router.get("/reportePrestamos", reporte_prestamos)
router.get("/reporteSolicitudes", reporte_solicitudes)
router.get("/reporteTransacciones", reporte_transacciones)

export default router;