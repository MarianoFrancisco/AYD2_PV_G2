import uploadToS3 from './s3-service.js';

/*
 * @author
 * Mariano Camposeco {@literal (mariano1941@outlook.es)}
 */
const uploadPhoto = async (fileBuffer, fileName, fileType) => {
    return await uploadToS3(fileBuffer, fileName, fileType, process.env.AWS_FOLDER_PHOTOGRAPHY,);
};

export {
    uploadPhoto
};
