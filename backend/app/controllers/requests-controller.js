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

dotenv.config();


const requestCancelSolicitud = async (req, res) => {

    //Recibir los datos del form
    // Numero de cuenta o cui
    // servicio a cancelar (cuenta o tarjeta)
    // Motivo de la cancelacion
    


    //Generar la fecha actual

    //Colocar estado de solicitud como pendiente


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





export {
    requestCancelSolicitud,
    requestPrestamo
}