import { uploadPhoto, uploadStationery } from '../services/save-s3-service.js';

/*
 * @author
 * Mariano Camposeco {@literal (mariano1941@outlook.es)}
 */
const uploadFilesHandler = async (req, res, next) => {
    try {
        // Procesar imagen
        if (req.files.photo) {
            const photoFile = req.files.photo[0];
            const photoType = photoFile.mimetype;
            const photoBuffer = photoFile.buffer;
            const photoName = photoFile.originalname;

            req.photoPath = await uploadPhoto(photoBuffer, photoName, photoType);
        } else {
            req.photoPath = null;
        }

        // Procesar PDF
        if (req.files.pdf) {
            const pdfFile = req.files.pdf[0];
            const pdfType = pdfFile.mimetype;
            const pdfBuffer = pdfFile.buffer;
            const pdfName = pdfFile.originalname;
            req.pdfPath = await uploadStationery(pdfBuffer, pdfName, pdfType);
        } else {
            req.pdfPath = null;
        }
        console.log(req.pdfPath)
        next();
    } catch (error) {
        res.status(500).json({ message: 'Error uploading files.', error: error.message });
    }
};

export default uploadFilesHandler;