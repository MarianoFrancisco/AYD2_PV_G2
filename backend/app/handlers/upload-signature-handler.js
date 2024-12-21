import { uploadSignature } from '../services/save-s3-service.js';

/*
 * @author
 * Mariano Camposeco {@literal (mariano1941@outlook.es)}
 */
const uploadSignatureHandler = async (req, res, next) => {
    try {
        const file = req.file;

        if (!file) {
            return res.status(400).json({ message: 'Signature file is required.' });
        }

        const fileType = file.mimetype;
        const fileBuffer = file.buffer;
        const fileName = file.originalname;

        const signaturePath = await uploadSignature(fileBuffer, fileName, fileType);

        req.signaturePath = signaturePath;

        next();
    } catch (error) {
        res.status(500).json({ message: 'Error uploading signature.', error: error.message });
    }
};

export default uploadSignatureHandler;
