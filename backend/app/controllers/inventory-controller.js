import AccountModel from "../models/account-model.js";
import CardModel from "../models/card-model.js";
import LoanModel from "../models/loan-model.js";
import TransactionHistoryModel from "../models/transaction-history-model.js";

/**
 * Endpoint 1: Obtener el Capital Total
 */
export const getCapitalTotal = async (req, res) => {
  try {
    // Sumar balances de cuentas
    const totalBalance = await AccountModel.sum("balance");

    // Sumar límites de crédito de tarjetas
    const totalCreditLimit = await CardModel.sum("credit_limit");

    // Sumar montos de transacciones filtradas
    const totalTransactions = await TransactionHistoryModel.sum("amount", {
      where: {
        transaction_type: ["Depósito", "Pago de Servicio", "Pago de Préstamo", "Pago crédito"],
      },
    });

    // Calcular el capital total
    const capitalTotal = (totalBalance || 0) + (totalCreditLimit || 0) + (totalTransactions || 0);

    return res.status(200).json({
      Capital_Total: capitalTotal,
    });
  } catch (error) {
    console.error("Error al calcular el Capital Total:", error);
    return res.status(500).json({
      message: "Ocurrió un error al calcular el Capital Total.",
    });
  }
};

/**
 * Endpoint 2: Entradas y Salidas
 */
export const getEntradasYSalidas = async (req, res) => {
  try {
    // Obtener transacciones de tipo "Entradas"
    const entradas = await TransactionHistoryModel.findAll({
      where: {
        transaction_type: ["Depósito", "Pago de Servicio", "Pago de Préstamo", "Pago crédito"],
      },
    });

    // Obtener transacciones de tipo "Salidas"
    const salidasTransacciones = await TransactionHistoryModel.findAll({
      where: {
        transaction_type: "Retiro",
      },
    });

    // Obtener préstamos (se consideran como "Salidas")
    const salidasPrestamos = await LoanModel.findAll();

    // Combinar "Salidas"
    const salidas = {
      transacciones: salidasTransacciones,
      prestamos: salidasPrestamos,
    };

    return res.status(200).json({
      entradas,
      salidas,
    });
  } catch (error) {
    console.error("Error al obtener Entradas y Salidas:", error);
    return res.status(500).json({
      message: "Ocurrió un error al obtener las Entradas y Salidas.",
    });
  }
};