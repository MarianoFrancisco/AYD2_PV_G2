import sequelize from '../../config/database-connection.js';
import CardModel from '../models/card-model.js';
import AccountModel from '../models/account-model.js';
import UserModel from '../models/user-model.js';
import TransactionHistoryModel from '../models/transaction-history-model.js';

export const payCreditCard = async (req, res) => {
  const { employee_id, account_id, card_number, amount, payment_date } = req.body;

  const transaction = await sequelize.transaction();
  try {
    const card = await CardModel.findOne({
      where: { account_id, card_number, card_type: 'Crédito' },
    });

    if (!card) {
      return res.status(404).json({ error: 'Tarjeta de crédito no encontrada.' });
    }

    const debt = parseFloat(card.credit_limit) - parseFloat(card.balance);
    if (amount > debt) {
      return res.status(400).json({
        error: 'El monto excede la deuda de la tarjeta de crédito.',
      });
    }

    const account = await AccountModel.findOne({ where: { id: account_id } });
    if (!account) {
      return res.status(404).json({ error: 'Cuenta no encontrada.' });
    }

    if (parseFloat(account.balance) < parseFloat(amount)) {
      return res.status(400).json({
        error: 'Fondos insuficientes en la cuenta para realizar el pago.',
      });
    }

    // Actualizar el balance de la cuenta
    account.balance = parseFloat((parseFloat(account.balance) - parseFloat(amount)).toFixed(2));
    await account.save({ transaction });

    // Actualizar el balance de la tarjeta
    card.balance = parseFloat((parseFloat(card.balance) + parseFloat(amount)).toFixed(2));
    await card.save({ transaction });

    // Determinar descripción del pago basado en el balance actualizado
    const isTotalPayment =
      Math.abs(card.balance - card.credit_limit) < 0.01; // Compara usando tolerancia
    const description = isTotalPayment
      ? 'pago total tarjeta de crédito'
      : 'pago parcial tarjeta de crédito';

    // Crear la transacción en el historial
    await TransactionHistoryModel.create(
      {
        account_id,
        transaction_type: 'Pago crédito',
        amount: parseFloat(amount),
        description,
        created_at: Math.floor(Date.now() / 1000), // Timestamp en segundos
      },
      { transaction }
    );

    // Buscar los detalles del empleado
    const employee = await UserModel.findOne({
      where: { id: employee_id },
      attributes: ['id', 'signature_path'],
    });

    if (!employee) {
      return res.status(404).json({ error: 'Empleado no encontrado.' });
    }

    // Confirmar la transacción
    await transaction.commit();

    return res.status(200).json({
      message: 'Pago realizado con éxito.',
      account_details: {
        account_number: account.account_number,
        name: account.name,
        last_name: account.last_name,
        account_type: account.account_type,
      },
      employee_details: {
        employeeID: employee.id,
        employeeSignature: employee.signature_path,
      },
      payment_details: {
        card_number,
        amount: parseFloat(amount),
        payment_date,
      },
    });
  } catch (error) {
    await transaction.rollback();
    console.error(error);
    return res.status(500).json({ error: 'Error al procesar el pago.' });
  }
};
