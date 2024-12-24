import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import uploadToS3 from '../services/s3-service.js';

const TEMP_FOLDER = '../../backup';
const DB_HOST = process.env.MYSQL_HOST;
const DB_USER = process.env.MYSQL_USER;
const DB_PASSWORD = process.env.MYSQL_PASSWORD;
const DB_NAME = process.env.MYSQL_DATABASE;

const generateBackup = async (req, res) => {
    const backupFileName = `${DB_NAME}-${Date.now()}.sql`;
    const backupFilePath = path.join(TEMP_FOLDER, backupFileName);

    try {
        if (!fs.existsSync(TEMP_FOLDER)) {
            fs.mkdirSync(TEMP_FOLDER, { recursive: true });
        }

        console.log('Generando respaldo de la base de datos...');
        const dumpCommand = `mysqldump -h ${DB_HOST} -u ${DB_USER} -p${DB_PASSWORD} ${DB_NAME} > ${backupFilePath}`;

        await new Promise((resolve, reject) => {
            exec(dumpCommand, (error) => {
                if (error) {
                    console.error('Error ejecutando el comando de respaldo:', error);
                    return reject(error);
                }
                resolve();
            });
        });

        console.log('Respaldo generado, leyendo archivo...');
        const fileBuffer = fs.readFileSync(backupFilePath);

        console.log('Subiendo respaldo a S3...');
        const fileUrl = await uploadToS3(fileBuffer, backupFileName, 'application/sql', 'db-backups');

        console.log('Respaldo subido exitosamente:', fileUrl);

        fs.unlinkSync(backupFilePath);
        console.log('Archivo temporal eliminado.');

        res.status(200).json({
            message: 'Respaldo completado exitosamente.',
            fileUrl,
        });
    } catch (error) {
        console.error('Error durante el respaldo o la subida:', error);

        res.status(500).json({
            message: 'Error durante el proceso de respaldo.',
            error: error.message,
        });
    }
};

export { generateBackup };