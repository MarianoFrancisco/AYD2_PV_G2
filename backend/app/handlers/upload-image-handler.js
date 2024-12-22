import { uploadPhoto } from '../services/save-s3-service.js';

/*
 * @author
 * Mariano Camposeco {@literal (mariano1941@outlook.es)}
 */
const uploadImageHandler = async (req, res, next) => {
    try {
        const file = req.file;

        if (!file) {
            req.photoPath = null;
            return next();
        }

        const fileType = file.mimetype;
        const fileBuffer = file.buffer;
        const fileName = file.originalname;

        const photoPath = await uploadPhoto(fileBuffer, fileName, fileType);

        req.photoPath = photoPath;

        next();
    } catch (error) {
        res.status(500).json({ message: 'Error uploading image.', error: error.message });
    }
};

export default uploadImageHandler;

