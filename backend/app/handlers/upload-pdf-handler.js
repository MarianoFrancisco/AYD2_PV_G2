import { uploadPhoto } from '../services/save-s3-service.js';

/*
 * @author
 * Mariano Camposeco {@literal (mariano1941@outlook.es)}
 */
const uploadPdfhandler = async (req, res, next) => {
    try {
        const file = req.file;

        if (!file) {
            req.pdfPath = null;
            return next();
        }

        const fileType = file.mimetype;
        const fileBuffer = file.buffer;
        const fileName = file.originalname;

        const pdfPath = await uploadpdf(fileBuffer, fileName, fileType);

        req.pdfPath = pdfPath;

        next();
    } catch (error) {
        res.status(500).json({ message: 'Error uploading image.', error: error.message });
    }
};

export default uploadPdfhandler;