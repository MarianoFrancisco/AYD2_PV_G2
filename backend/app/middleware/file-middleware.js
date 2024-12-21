import multer from 'multer';

/*
 * @author
 * Mariano Camposeco {@literal (mariano1941@outlook.es)}
 */
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (file.originalname.endsWith('.ayd')) {
        cb(null, true);
    } else {
        cb(new Error('Only .ayd files are allowed!'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024
    }
});

const uploadSingleAydFile = upload.single('file');

export default uploadSingleAydFile;
