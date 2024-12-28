import AccountModel from "../models/account-model.js";
import AccountUpdateModel from '../models/account-update-model.js';
import sequelize from '../../config/database-connection.js';
import generateAccountNumber from "../middleware/numberAccount-middleware.js";
import ComplaintsModel from "../models/complaints-model.js";
import dotenv from 'dotenv';
import sendEmail from "../services/send-mail-service.js";
import UserModel from "../models/user-model.js";
import RequestLoanModel from "../models/service-request-loan-model.js";
import CurrencyExchangeModel from "../models/currency-exchange-model.js";

import ServiceCancellation from "../models/service_cancellations-model.js";
import requestChangeInfo from "../models/request-change-info-model.js";

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
    if (!account_id || !service || !reason) {
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

    if (!user) {
        return res.status(404).json({ message: "Cuenta de usuario no encontrado." });
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
    const {
        account_id,
        type_loan,
        mount,
        tiempo,
        plazo, //Años, Meses

    } = req.body

    //documentacion
    console.log(req.pdfPath)


    // Valicadion de parametros obligatorios
    if (!account_id || !type_loan || !mount || !tiempo || !plazo) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    //Validar tipo  del prestamo
    if (!["Personal", "Hipotecario", "Vehicular", "Educativo"].includes(type_loan)) {
        return res.status(400).json({ message: 'Tipo de prestamo invalido' });
    }

    //Validar tiempo
    if (!["Meses", "Años"].includes(plazo)) {
        return res.status(400).json({ message: 'Plazo invalido' });
    }

    //validar existencia del usuario
    const user = await AccountModel.findOne({
        where: {
            account_number: account_id
        }
    });

    if (!user) {
        return res.status(404).json({ message: "Cuenta de usuario no encontrado." });
    }



    //Generar fecha y hora
    const currentDate = Math.floor(Date.now() / 1000);


    //Estado de solicitud como pendiente
    try {
        await RequestLoanModel.create({
            account_id: parseInt(user.id, 10),
            loan_type: type_loan,
            requested_amount: parseFloat(mount),
            term: plazo, //años, meses 
            loan_term: parseInt(tiempo, 10), //int
            requested_at: currentDate,
            status: "Pendiente",
            documentation_path: req.pdfPath


        })

        return res.status(200).json({ message: 'Solicitud de prestamo enviado' });


    } catch (error) {
        res.status(500).json({ message: 'Error interno', error: error.message });
    }

}

const sendRequestChangePassword = async (req, res) => {

    const {
        user_name
    } = req.body

    //Validar parametros obligatorios
    if (!user_name) {
        return res.status(400).json({ message: "Todos los campos son obligatorios" })
    }

    //validar existencia del usuario
    const user = await UserModel.findOne({
        where: {
            user_name: user_name
        }
    });

    if (!user) {
        return res.status(404).json({ message: "Cuenta de usuario no encontrado." });
    }

    //Generar la fecha actual
    const currentDate = Math.floor(Date.now() / 1000);


    //Type de solicitud Password
    try {
        await requestChangeInfo.create({
            account_id: parseInt(user.id, 10),
            type: "Password",
            created_at: currentDate

        })

        return res.status(200).json({ message: 'Solicitud de cambio de contraseña enviado' });


    } catch (error) {
        res.status(500).json({ message: 'Error interno', error: error.message });
    }


}

const sendRequestChangeInfo = async (req, res) => {

    const {
        user_name
    } = req.body

    //Validar parametros obligatorios
    if (!user_name) {
        return res.status(400).json({ message: "Todos los campos son obligatorios" })
    }

    //validar existencia del usuario
    const user = await UserModel.findOne({
        where: {
            user_name: user_name
        }
    });

    if (!user) {
        return res.status(404).json({ message: "Cuenta de usuario no encontrado." });
    }

    //Generar la fecha actual
    const currentDate = Math.floor(Date.now() / 1000);


    //Type de solicitud Informacion
    try {
        await requestChangeInfo.create({
            account_id: parseInt(user.id, 10),
            type: "Informacion",
            created_at: currentDate

        })

        return res.status(200).json({ message: 'Solicitud de cambio de contraseña enviado' });


    } catch (error) {
        res.status(500).json({ message: 'Error interno', error: error.message });
    }


}

const getRequestChangePasword = async (req, res) => {

    try {
        const requestChangePassword = await requestChangeInfo.findAll({
            where: {
                type: "Password"
            }
        })

        let users = []

        for (let i = 0; i < requestChangePassword.length; i++) {
            const user = await UserModel.findOne({
                where: {
                    id: requestChangePassword[i].account_id
                }

            })

            users.push(user)

        }

        return res.status(200).json({ Solicitudes: users });



    } catch (error) {
        res.status(500).json({ message: 'Error interno', error: error.message });
    }





}

const getRequestChangInfo = async (req, res) => {
    try {
        const requestChange = await requestChangeInfo.findAll({
            where: {
                type: "Informacion"
            }
        })

        let users = []

        for (let i = 0; i < requestChange.length; i++) {
            const user = await UserModel.findOne({
                where: {
                    id: requestChange[i].account_id
                }

            })

            users.push(user)

        }

        return res.status(200).json({ Solicitudes: users });



    } catch (error) {
        res.status(500).json({ message: 'Error interno', error: error.message });
    }
}





export {
    requestCancelSolicitud,
    requestPrestamo,
    sendrequestPrestamo,
    sendRequestChangeInfo,
    sendRequestChangePassword,
    getRequestChangInfo,
    getRequestChangePasword
}