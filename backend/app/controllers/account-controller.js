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

const getBalance = async (req, res) => {

    const { id } = req.params;

    try {
        const accountModel = await AccountModel.findOne({
            where: {
                account_number: id
            }
        })

        res.status(200).json({
            "Saldo": accountModel.balance,
            "Fecha": accountModel.update_balance_at,
            "Moneda": accountModel.currency
        });

    } catch (error) {
        res.status(500).json({ message: 'Error fetching accounts: ' + error.message });
    }
}

const getSecurityQuestionByAccountNumber = async (req, res) => {
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

const getPhotographyPathByAccountNumber = async (req, res) => {
    const { account_number } = req.query;

    if (!account_number) {
        return res.status(400).json({ message: 'Account number is required.' });
    }

    try {
        const account = await AccountModel.findOne({
            where: { account_number },
            attributes: ['photo_path']
        });

        if (!account) {
            return res.status(404).json({ message: 'Account not found.' });
        }

        res.status(200).json({
            message: 'Photography path retrieved successfully.',
            photo_path: account.photo_path
        });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving photography path.', error: error.message });
    }
};

const updateAccountInfo = async (req, res) => {
    const { account_number, security_answer, updates } = req.body;

    if (!account_number || !security_answer || !updates || typeof updates !== 'object') {
        return res.status(400).json({ message: 'Account number, security answer, and updates are required.' });
    }

    const transaction = await sequelize.transaction();

    try {
        const account = await AccountModel.findOne({ where: { account_number } });

        if (!account) {
            await transaction.rollback();
            return res.status(404).json({ message: 'Account not found.' });
        }

        if (account.security_answer !== security_answer) {
            await transaction.rollback();
            return res.status(403).json({ message: 'Invalid security answer.' });
        }

        const allowedFields = [
            'phone',
            'email',
            'name',
            'last_name',
            'photo_path',
            'address',
            'cui',
            'gender',
            'age'
        ];

        const fieldsToUpdate = {};
        const updateDetails = [];

        if (req.photoPath) {
            updates.photo_path = req.photoPath;
        }

        for (const [field, newValue] of Object.entries(updates)) {
            if (allowedFields.includes(field) && account[field] !== undefined && account[field] !== newValue) {
                updateDetails.push({
                    field_name: field,
                    old_value: account[field],
                    new_value: newValue
                });
                fieldsToUpdate[field] = newValue;
            }
        }

        if (updateDetails.length > 0) {
            await account.update(fieldsToUpdate, { transaction });

            const logEntry = {
                account_id: account.id,
                field_name: updateDetails.length === 1 ? updateDetails[0].field_name : 'Multiple fields',
                old_value: updateDetails.length === 1
                    ? updateDetails[0].old_value
                    : JSON.stringify(updateDetails.map(d => ({ field: d.field_name, value: d.old_value }))),
                new_value: updateDetails.length === 1
                    ? updateDetails[0].new_value
                    : JSON.stringify(updateDetails.map(d => ({ field: d.field_name, value: d.new_value }))),
                updated_at: Math.floor(Date.now() / 1000)
            };

            await AccountUpdateModel.create(logEntry, { transaction });
        }

        await transaction.commit();

        res.status(200).json({ message: 'Account information updated successfully.' });
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ message: 'Error updating account information.', error: error.message });
    }
};

const createAccount = async (req, res) => {
    try {
        console.log(req.photoPath)
        const {
            firstName,
            lastName,
            cui,
            phone,
            email,
            age,
            gender,
            accountType,
            securityQuestion,
            securityAnswer,
            amount,
        } = req.body;




        // Valicadion de parametros obligatorios
        if (!firstName || !lastName || !cui || !phone || !email || !age || !gender || !accountType || !securityQuestion || !amount) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        // Verificar tipo de cuenta 1=Monetario, 2=Ahorro
        if (!["Monetario", "Ahorro"].includes(accountType)) {
            return res.status(400).json({ message: 'El tipo de cuenta debe ser "monetaria" o "ahorro"' });
        }

        // Encriptar pregunta de seguridad
        const hashedQuestion = await bcrypt.hash(securityQuestion, 10);
        const hashedAnswer = await bcrypt.hash(securityAnswer, 10);

        // Generar número de cuenta y fecha
        const accountNumber = generateAccountNumber();
        console.log(accountNumber)
        const currentDate = Math.floor(Date.now() / 1000);



        // Simular almacenamiento (aquí podrías guardar en una base de datos)

        await AccountModel.create({
            account_number: accountNumber,
            cui: cui,
            name: firstName,
            last_name: lastName,
            phone: phone,
            email: email,
            age: parseInt(age, 10),
            gender: gender,
            photo_path: req.photoPath,
            account_type: accountType,
            currency: "Quetzales",
            balance: parseFloat(amount),
            created_at: currentDate,
            update_balance_at: currentDate,
            security_question: hashedQuestion,
            security_answer: hashedAnswer
        })


        console.log('Nueva cuenta creada');
        res.status(201).json({
            message: 'Cuenta creada exitosamente',
            accountNumber,
            creationDate: currentDate,
        });
    } catch (error) {
        console.error('Error al crear la cuenta:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }

}

const registroQuejas = async (req, res) => {
    try {
        //form
        const {
            identificacion,
            detalle,
            tipoQueja

        } = req.body

        console.log(req.body)

        // Valicadion de parametros obligatorios
        if (!identificacion || !detalle || !tipoQueja) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        // Verificar tipo de queja
        if (!["Servicio", "Producto", "Atencion al cliente"].includes(tipoQueja)) {
            return res.status(400).json({ message: 'El tipo de cuenta debe ser "monetaria" o "ahorro"' });
        }

        //fecha de queja
        const currentDate = Math.floor(Date.now() / 1000);

        let account_id = ""
        let id = 0

        //buscar cuenta
        let cuenta = await AccountModel.findOne({
            where: {
                cui: identificacion
            }
        })

        if (!cuenta) {
            cuenta = await AccountModel.findOne({
                where: {
                    account_number: identificacion
                }
            })

            if (!cuenta) {
                return res.status(400).json({ message: 'No existe el usuario' });
            } else {
                id = cuenta.id
            }

        } else {

            id = cuenta.id
        }



        //Buscar cuenta supervisor
        let cuentaSupervisor = await UserModel.findOne({
            where: {
                role: "Supervisor",
            },
        });

        if (!cuentaSupervisor) {
            return res.status(400).json({ message: 'No hay una cuenta de supervisor' });
        }


        const contenido = "<p>" + detalle + "</p>"

        const info = await sendEmail("luisgagu9@gmail.com", "Queja", detalle, contenido)

        await ComplaintsModel.create({
            account_id: id,
            details: detalle,
            created_at: currentDate,
            category: tipoQueja
        })

        console.log('Nueva queja creada');
        res.status(201).json({
            message: 'Queja registrada correctamente',
            identificacion,
            creationDate: currentDate,
        });


    } catch (error) {
        console.error('Error al crear la cuenta:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }

}

const createEmployee = async (req, res) => {
    try {
        console.log(req.photoPath)
        console.log(req.pdfPath) //pdf
        const {
            fullName,
            phone,
            age,
            cui,
            email,
            gender,
            marital_status,
            role,
            signature
        } = req.body;



        console.log(fullName)
        console.log(marital_status)


        // Valicadion de parametros obligatorios
        if (!fullName || !phone || !age || !cui || !email || !gender || !marital_status) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        // Verificar genero
        if (!["Masculino", "Femenino", "Otro"].includes(gender)) {
            return res.status(400).json({ message: 'Genero invalido' });
        }

        // Verificar genero
        if (!["Masculino", "Femenino", "otro"].includes(gender)) {
            return res.status(400).json({ message: 'Genero invalido' });
        }

        // Verificar genero
        if (!["Soltero", "Casado", "Divorciado", "Viudo", "Otro"].includes(marital_status)) {
            return res.status(400).json({ message: 'Estado civil invalido' });
        }

        //generar contraseña
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
        let password = '';
        for (let i = 0; i < 16; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            password += characters[randomIndex];
        }

        let crearUsername = true
        let username = ""
        while (crearUsername) {
            //Crear nombre usuario
            const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
            username = '';

            for (let i = 0; i < 10; i++) {
                const randomIndex = Math.floor(Math.random() * letters.length);
                username += letters[randomIndex];
            }

            //verificar que no exista
            const users = await UserModel.findAll();
            let ya_existe = false

            for (var i = 0; i < users.length; i++) {

                if (users[i].user_name == username) {
                    ya_existe = true
                }

            }

            if (!ya_existe) {
                crearUsername = false
            }


        }

        //Encriptar contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        const detalle = "Se le ha creado la siguiente cuenta. Nombre usuario: " + username + " contraseña: " + password
        const contenido = "<p>" + detalle + "</p>"
        //Enviar correo
        const info = await sendEmail(email, "Acceso", detalle, contenido)

        //generar fecha
        const currentDate = Math.floor(Date.now() / 1000);


        // Simular almacenamiento (aquí podrías guardar en una base de datos)
        const newUser = await UserModel.create({
            name: fullName,
            role: role,
            user_name: username,
            email: email,
            password: hashedPassword,
            phone: phone,
            age: parseInt(age, 10),
            dpi_number: cui,
            complete_papework_path: req.pdfPath,
            photo_path: req.photoPath,
            gender: gender,
            marital_status: marital_status,
            signature_path: "https://money-bin-group2.s3.us-east-1.amazonaws.com/signature/test.png",
            second_password_hash: hashedPassword,
            created_at: currentDate
        });

        console.log('Nuevo empleado creado');
        res.status(201).json({
            message: 'Empleado creado exitosamente',
            cui,
            creationDate: currentDate,
            user_id: newUser.id
        });
    } catch (error) {
        console.error('Error al crear el empleado:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }

}

const createAdmin = async (req, res) => {
    try {
        console.log(req.photoPath)
        console.log(req.pdfPath)
        const {
            fullName,
            phone,
            age,
            cui,
            email,
            gender,
            marital_status,
        } = req.body;

        console.log(fullName)
        console.log(marital_status)

        // Valicadion de parametros obligatorios
        if (!fullName || !phone || !age || !cui || !email || !gender || !marital_status) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        // Verificar genero
        if (!["Masculino", "Femenino", "Otro"].includes(gender)) {
            return res.status(400).json({ message: 'Genero invalido' });
        }


        // Verificar estado
        if (!["Soltero", "Casado", "Divorciado", "Viudo", "Otro"].includes(marital_status)) {
            return res.status(400).json({ message: 'Estado civil invalido' });
        }

        //generar contraseña
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
        let password = '';
        for (let i = 0; i < 16; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            password += characters[randomIndex];
        }

        let crearUsername = true
        let username = ""
        while (crearUsername) {
            //Crear nombre usuario
            const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
            username = '';

            for (let i = 0; i < 10; i++) {
                const randomIndex = Math.floor(Math.random() * letters.length);
                username += letters[randomIndex];
            }

            //verificar que no exista
            const users = await UserModel.findAll();
            let ya_existe = false

            for (var i = 0; i < users.length; i++) {

                if (users[i].user_name == username) {
                    ya_existe = true
                }

            }

            if (!ya_existe) {
                crearUsername = false
            }


        }

        //Encriptar contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        const detalle = "Se le ha creado la siguiente cuenta. Nombre usuario: " + username + " contraseña: " + password
        const contenido = "<p>" + detalle + "</p>"
        //Enviar correo
        const info = await sendEmail(email, "Acceso", detalle, contenido)

        //generar fecha
        const currentDate = Math.floor(Date.now() / 1000);


        // Simular almacenamiento (aquí podrías guardar en una base de datos)
        await UserModel.create({
            name: fullName,
            role: "Administrador de Sistemas",
            user_name: username,
            email: email,
            password: hashedPassword,
            phone: phone,
            age: parseInt(age, 10),
            dpi_number: cui,
            complete_papework_path: req.pdfPath, //obtener 
            photo_path: req.photoPath,
            gender: gender,
            marital_status: marital_status,
            signature_path: "https://money-bin-group2.s3.us-east-1.amazonaws.com/signature/test.png",
            second_password_hash: "",
            created_at: currentDate //generar

        })

        console.log('Nuevo administrador de sistemas creado');
        res.status(201).json({
            message: 'administrador de sistemas creado exitosamente',
            cui,
            creationDate: currentDate,
        });
    } catch (error) {
        console.error('Error al crear el administrador:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }

}

const exchangeCurrency = async (req, res) => {
    const { cui, amount } = req.body;

    if (!cui || !amount) {
        return res.status(400).json({ error: "CUI and amount are required." });
    }

    if (amount <= 0) {
        return res.status(400).json({ error: "Amount must be greater than 0." });
    }

    try {
        // Verificar si el cliente existe
        let user = await CurrencyExchangeModel.findOne({ where: { cui } });

        if (!user) {
            // Crear nuevo registro si el cliente no existe
            user = await CurrencyExchangeModel.create({ cui, amount_exchanged: 0 });
        }

        const currentDate = new Date();

        // Calcular inicio y fin del día actual
        const dayStart = startOfDay(currentDate);
        const dayEnd = endOfDay(currentDate);

        // Obtener las transacciones del día actual
        const dailyTransactions = await CurrencyExchangeModel.findAll({
            where: {
                cui,
                last_exchange_date: {
                    [Op.between]: [dayStart, dayEnd],
                },
            },
        });

        // Sumar los montos ya intercambiados hoy
        const totalExchangedToday = dailyTransactions.reduce(
            (total, tx) => total + parseFloat(tx.amount_exchanged),
            0
        );

        if (totalExchangedToday + amount > 10000.00) {
            return res
                .status(400)
                .json({
                    error: `Daily limit exceeded: You have Q${(10000.00 - totalExchangedToday).toFixed(
                        2
                    )} remaining today.`,
                });
        }

        // Validar si el cliente ya realizó un cambio este mes
        if (
            user.last_exchange_date &&
            new Date(user.last_exchange_date).getMonth() === currentDate.getMonth()
        ) {
            return res
                .status(400)
                .json({ error: "Exchange not allowed: already exchanged this month." });
        }

        // Realizar el cambio de moneda
        const usdAmount = (amount / 7.8).toFixed(2); // Supongamos una tasa de cambio fija de 7.8

        // Actualizar registro del cliente
        user.last_exchange_date = currentDate;
        user.amount_exchanged = amount;

        await user.save();

        return res.status(200).json({
            message: "Exchange successful",
            cui,
            amount_in_quetzales: parseFloat(amount),
            amount_in_dollars: parseFloat(usdAmount),
            exchange_rate: 7.8,
            total_exchanged_today: totalExchangedToday + amount,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};

const sentPetitionPassword = async (req, res) => {

}

const changePassword = async (req, res) => {

    const {
        user_name
    } = req.body;


    //Validar campos
    if (!user_name) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }


    //Genero una nueva contraseña
    //generar contraseña
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
    let password = '';
    for (let i = 0; i < 16; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }

    //Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    //Validar que exista el usuario
    const userModel = await UserModel.findOne({
        where: {
            user_name: user_name
        }
    });

    if (!userModel) {
        return res.status(404).json({ message: 'User not found' });
    }


    //Cambiar contraseña en base de datos
    userModel.password = hashedPassword
    userModel.second_password_hash = hashedPassword
    await userModel.save();


    //Enviar notificacion al correo del usuario
    const detalle = "Se le ha cambiado su contraseña por la siguiente: " + password
    const contenido = "<p>" + detalle + "</p>"

    const info = await sendEmail(userModel.email, "Acceso", detalle, contenido)


    //Enviar respuesta al frontend
    return res.status(200).json({ message: 'User updated successfully', user: userModel });



}



const getEmpleados = async (req, res) => {

    //Obtener informacion de todos los empleados
    try {
        const empleados = await UserModel.findAll({
            where: {

                role: { [Op.ne]: "Supervisor" }

            }
        })

        return res.status(200).json({ empleados: empleados })

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }




}

const changeInfo = async (req, res) => {

    try{
        const {
            user_name, //para buscar el empleado
            name,
            phone,
            email,
            gender,
            estado_civil
    
        } = req.body
    
        //Validar campos
        if (!user_name || !name || !phone || !email || !gender || !estado_civil) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }
    
        // Verificar genero
        if (!["Masculino", "Femenino", "Otro"].includes(gender)) {
            return res.status(400).json({ message: 'Genero invalido' });
        }
    
    
        // Verificar estado
        if (!["Soltero", "Casado", "Divorciado", "Viudo", "Otro"].includes(estado_civil)) {
            return res.status(400).json({ message: 'Estado civil invalido' });
        }
    
        //Validar existencia dl usuariio
        const user = await UserModel.findOne({
            where: {
                user_name: user_name
            }
        })
    
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        console.log(req.photoPath)
        //Cambiar los datos
        user.name = name
        user.phone = phone
        user.email = email
        user.photo_path = req.photoPath
        user.gender = gender
        user.marital_status = estado_civil
        await user.save();
    
    
        //Enviar respuesta al frontend
        return res.status(200).json({ message: 'User updated successfully', user: user });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error.", message: error });
    }

    



}

export {
    getBalance,
    getSecurityQuestionByAccountNumber,
    getPhotographyPathByAccountNumber,
    updateAccountInfo,
    createAccount,
    registroQuejas,
    createEmployee,
    createAdmin,
    exchangeCurrency,
    changePassword,
    changeInfo,
    getEmpleados
}