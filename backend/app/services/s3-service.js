import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

/*
 * @author
 * Mariano Camposeco {@literal (mariano1941@outlook.es)}
 */
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const uploadToS3 = async (fileBuffer, fileName, fileType, folder) => {
    const bucketName = process.env.AWS_S3_BUCKET_NAME;
    const key = `${folder}/${uuidv4()}-${fileName}`;

    const params = {
        Bucket: bucketName,
        Key: key,
        Body: fileBuffer,
        ContentType: fileType
    };

    try {
        const command = new PutObjectCommand(params);
        await s3.send(command);
        await delay(1000);
        return `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    } catch (error) {
        console.error('Error uploading data:', error);
        throw new Error('Error uploading data');
    }
};

export default uploadToS3;
