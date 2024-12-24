import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import uploadToS3 from '../services/s3-service';

const DB_HOST = process.env.MYSQL_HOST;
const DB_USER = process.env.MYSQL_USER;
const DB_PASSWORD = process.env.MYSQL_PASSWORD;
const DB_NAME = process.env.MYSQL_DATABASE;

const TEMP_FOLDER = '../../../database';

export const backupDatabase = async () => {
    const backupFileName = `${DB_NAME}-${Date.now()}.sql`;
    const backupFilePath = path.join(TEMP_FOLDER, backupFileName);

    const dumpCommand = `mysqldump -h ${DB_HOST} -u ${DB_USER} -p${DB_PASSWORD} ${DB_NAME} > ${backupFilePath}`;

    try {
        await new Promise((resolve, reject) => {
            exec(dumpCommand, (error) => {
                if (error) {
                    console.error('Error ejecutando el comando de respaldo:', error);
                    return reject(error);
                }
                resolve();
            });
        });
        const fileBuffer = fs.readFileSync(backupFilePath);

        const fileUrl = await uploadToS3(fileBuffer, backupFileName, 'application/sql', 'db-backups');
        fs.unlinkSync(backupFilePath);

        return fileUrl;
    } catch (error) {
        throw error;
    }
};