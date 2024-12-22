import multer from 'multer';

/*
 * Configuración de multer
 */
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024 // Tamaño máximo (10 MB para ambos campos combinados)
    },
    fileFilter: (req, file, cb) => {
        if (file.fieldname === 'photo' && file.mimetype.startsWith('image/')) {
            cb(null, true); // Acepta imágenes para el campo 'photo'
        } else if (file.fieldname === 'pdf' && file.mimetype === 'application/pdf') {
            cb(null, true); // Acepta PDFs para el campo 'pdf'
        } else {
            cb(new Error(`Invalid file type for field ${file.fieldname}`), false);
        }
    }
});

export default upload;
