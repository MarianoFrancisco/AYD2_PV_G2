import AccountModel from "../models/account-model.js";
import AccountUpdateModel from '../models/account-update-model.js';
import sequelize from '../../config/database-connection.js';
import generateAccountNumber from "../middleware/numberAccount-middleware.js";
import ComplaintsModel from "../models/complaints-model.js";
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import sendEmail from "../services/send-mail-service.js";
import UserModel from "../models/user-model.js";
import CurrencyExchangeModel from "../models/currency-exchange-model.js";
import { startOfDay, endOfDay } from "date-fns";
import { Op } from "sequelize";
import ServiceCancellation from "../models/service_cancellations-model.js";

dotenv.config();


const requestCancelSolicitud = async (req, res) => {

    //Recibir los datos del form
    const {
        account_id, 
        service, 
        reason
    } = req.body;
    // Numero de cuenta o cui
    // servicio a cancelar (cuenta o tarjeta)
    // Motivo de la cancelacion


    //validar campos vacios
    if(!account_id || !service || !reason){
        return res.status(400).json({ error: "Faltan datos por llenar." })
    }

    //Verificar servicio
    if (!["Cuenta", "Tarjeta"].includes(service)) {
        return res.status(400).json({ message: 'Servicio invalido' });
    }  

    //Verificar que exista el numero de cuenta
    const user = await AccountModel.findOne({
        where: {
            account_number: account_id 
        } 
    }); 

    if(!user) {
        return res.status(404).json({ message: "Cuenta de usuario no encontrado."});
    }


    //Generar la fecha actual
    const currentDate = Math.floor(Date.now() / 1000);



    //Colocar estado de solicitud como pendiente
    try {
        await ServiceCancellation.create({
            account_id: parseInt(user.id, 10), 
            service: service,
            reason: reason, 
            status: "Pendiente",
            created_at: currentDate
        })

        return res.status(200).json({ message: 'Solicitud de cancelacion enviado' });

    } catch (error) {
        console.error('Error al enviar solicitud:', error);
        res.status(500).json({ message: 'Error interno del servidor', error: error });
    }
    

    

}



const requestPrestamo = async (req, res) => {
    const { account_number } = req.query;

    if (!account_number) {
        return res.status(400).json({ message: 'Account number is required.' });
    }

    try {
        const account = await AccountModel.findOne({
            where: { account_number },
            attributes: ['security_question']
        });

        if (!account) {
            return res.status(404).json({ message: 'Account not found.' });
        }

        res.status(200).json({
            message: 'Security question retrieved successfully.',
            security_question: account.security_question
        });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving security question.', error: error.message });
    }
};

const sendrequestPrestamo = async (req, res) => {

    /*Recibir cuenta/cui
    tipo de prestamo
    monto solicitado
    plazo del prestamo
    documentacion*/


    //Validar campos vacios

    //Validar plazo del prestamo

    //Generar fecha y hora

    //Estado de solicitud como pendiente
    

}





export {
    requestCancelSolicitud,
    requestPrestamo,
    sendrequestPrestamo
}