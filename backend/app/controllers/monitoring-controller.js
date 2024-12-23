import AccountModel from "../models/account-model.js";
import TransactionHistoryModel from "../models/transaction-history-model.js";
import LoanModel from "../models/loan-model.js";
import UserModel from "../models/user-model.js";
import sendEmail from "../services/send-mail-service.js";

/**
 * Endpoint 1: Obtener Retiros con Datos de Cuentas (Sin relaciones)
 */
export const getRetirosWithAccountData = async (req, res) => {
  try {
    // Obtener los retiros de la tabla de transacciones
    const transactions = await TransactionHistoryModel.findAll({
      where: { transaction_type: "Retiro" },
    });

    // Obtener todos los accounts relevantes
    const accountIds = transactions.map((t) => t.account_id);
    const accounts = await AccountModel.findAll({
      where: { id: accountIds },
      attributes: ["id", "account_number", "name", "last_name", "account_type"],
    });

    // Combinar datos manualmente
    const result = transactions.map((transaction) => {
      const account = accounts.find((acc) => acc.id === transaction.account_id);
      return {
        ...transaction.toJSON(),
        account,
      };
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error al obtener retiros:", error);
    return res.status(500).json({
      message: "Ocurrió un error al obtener los retiros.",
    });
  }
};

/**
 * Endpoint 2: Obtener Préstamos con Datos de Cuentas (Sin relaciones)
 */
export const getLoansWithAccountData = async (req, res) => {
  try {
    // Obtener los préstamos
    const loans = await LoanModel.findAll();

    // Obtener todos los accounts relevantes
    const accountIds = loans.map((loan) => loan.account_id);
    const accounts = await AccountModel.findAll({
      where: { id: accountIds },
      attributes: ["id", "account_number", "name", "last_name", "account_type"],
    });

    // Combinar datos manualmente
    const result = loans.map((loan) => {
      const account = accounts.find((acc) => acc.id === loan.account_id);
      return {
        ...loan.toJSON(),
        account,
      };
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error al obtener préstamos:", error);
    return res.status(500).json({
      message: "Ocurrió un error al obtener los préstamos.",
    });
  }
};

/**
 * Endpoint 3: Enviar Alarma por Correo (Sin relaciones)
 */

/*
export const sendAlarmEmail = async (req, res) => {
  const { transactionId, userId } = req.body;

  try {
    // Obtener el correo del usuario
    const user = await UserModel.findByPk(userId, {
      attributes: ["email"],
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    // Obtener los datos de la transacción
    const transaction = await TransactionHistoryModel.findByPk(transactionId);

    if (!transaction) {
      return res.status(404).json({ message: "Transacción no encontrada." });
    }

    // Preparar el contenido del correo
    const to = user.email;
    const subject = "Alarma";
    const text = `Detalles de la transacción: ${JSON.stringify(transaction)}`;
    const html = `<p>Detalles de la transacción:</p><pre>${JSON.stringify(transaction, null, 2)}</pre>`;

    // Enviar el correo
    await sendEmail(to, subject, text, html);

    return res.status(200).json({ message: "Correo enviado exitosamente." });
  } catch (error) {
    console.error("Error al enviar alarma por correo:", error);
    return res.status(500).json({
      message: "Ocurrió un error al enviar la alarma por correo.",
    });
  }
};
*/

export const sendAlarmEmail = async (req, res) => {
    const { transactionId, userId } = req.body;
  
    try {
      // Obtener el correo del usuario
      const user = await UserModel.findByPk(userId, {
        attributes: ["email"],
      });
  
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado." });
      }
  
      // Obtener los datos de la transacción
      const transaction = await TransactionHistoryModel.findByPk(transactionId);
  
      if (!transaction) {
        return res.status(404).json({ message: "Transacción no encontrada." });
      }
  
      // Obtener los datos de la cuenta asociada
      const account = await AccountModel.findByPk(transaction.account_id, {
        attributes: ["id", "account_number", "name", "last_name", "account_type"],
      });
  
      if (!account) {
        return res.status(404).json({ message: "Cuenta asociada no encontrada." });
      }
  
      // Combinar los datos de la transacción y la cuenta
      const transactionDetails = {
        ...transaction.toJSON(),
        account: account.toJSON(),
      };
  
      // Preparar el contenido del correo
      const to = user.email;
      const subject = "Alarma de Transacción";
      const text = `Detalles de la transacción:\n${JSON.stringify(transactionDetails, null, 2)}`;
      const html = `
        <p><strong>Detalles de la transacción:</strong></p>
        <ul>
          <li><strong>Tipo de Transacción:</strong> ${transactionDetails.transaction_type}</li>
          <li><strong>Monto:</strong> ${transactionDetails.amount}</li>
          <li><strong>Descripción:</strong> ${transactionDetails.description}</li>
          <li><strong>Fecha:</strong> ${new Date(transactionDetails.created_at * 1000).toLocaleString()}</li>
        </ul>
        <p><strong>Detalles de la Cuenta Asociada:</strong></p>
        <ul>
          <li><strong>Nombre:</strong> ${transactionDetails.account.name} ${transactionDetails.account.last_name}</li>
          <li><strong>Número de Cuenta:</strong> ${transactionDetails.account.account_number}</li>
          <li><strong>Tipo de Cuenta:</strong> ${transactionDetails.account.account_type}</li>
        </ul>
      `;
  
      // Enviar el correo
      await sendEmail(to, subject, text, html);
  
      return res.status(200).json({ message: "Alarma activada" });
    } catch (error) {
      console.error("Error al enviar alarma por correo:", error);
      return res.status(500).json({
        message: "Ocurrió un error al enviar la alarma por correo.",
      });
    }
  };