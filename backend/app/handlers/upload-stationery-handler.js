import { uploadStationery } from '../services/save-s3-service.js';

/*
 * @author
 * Mariano Camposeco {@literal (mariano1941@outlook.es)}
 */
const uploadStationeryHandler = async (req, res, next) => {
    try {
        const file = req.file;

        if (!file) {
            return res.status(400).json({ message: 'Stationery file is required.' });
        }

        const fileType = file.mimetype;
        const fileBuffer = file.buffer;
        const fileName = file.originalname;

        const stationeryPath = await uploadStationery(fileBuffer, fileName, fileType);

        req.stationeryPath = stationeryPath;

        next();
    } catch (error) {
        res.status(500).json({ message: 'Error uploading stationery.', error: error.message });
    }
};

export default uploadStationeryHandler;
