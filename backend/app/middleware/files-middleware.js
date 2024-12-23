import multer from 'multer';

/*
 * @author
 * Mariano Camposeco {@literal (mariano1941@outlook.es)}
 */
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024 // Límite general de tamaño: 10 MB
    },
    fileFilter: (req, file, cb) => {
        // Validación específica para imágenes
        if (file.fieldname === 'photo' && file.mimetype.startsWith('image/')) {
            return cb(null, true);
        }
        // Validación específica para PDF
        if (file.fieldname === 'pdf' && file.mimetype === 'application/pdf') {
            return cb(null, true);
        }
        // Archivo no permitido
        cb(new Error('Only image and PDF files are allowed!'), false);
    },
});

export default upload;
