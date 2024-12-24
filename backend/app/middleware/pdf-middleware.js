import multer from 'multer';

/*
 * @author
 * Mariano Camposeco {@literal (mariano1941@outlook.es)}
 */
const pdfUpload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed!'), false);
        }
    }
});

export default pdfUpload;
