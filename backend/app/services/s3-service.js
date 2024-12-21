import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const uploadToS3 = async (fileBuffer, fileName, fileType, folder) => {
    const bucketName = process.env.AWS_S3_BUCKET_NAME;
    const key = `${folder}/${uuidv4()}-${fileName}`;

    const params = {
        Bucket: bucketName,
        Key: key,
        Body: fileBuffer,
        ContentType: fileType,
        ACL: 'public-read'
    };

    try {
        const data = await s3.upload(params).promise();
        return data.Location;
    } catch (error) {
        console.error('Error uploading to S3:', error);
        throw new Error('Error uploading to S3');
    }
};

export default uploadToS3;
