import CardModel from "../models/card-model.js";
import AccountModel from "../models/account-model.js";

export const createCard = async (req, res) => {
  try {
    const { account_number, card_type, credit_limit, issue_date } = req.body;

    // Validar que los datos requeridos estén presentes
    if (!account_number || !card_type || !issue_date) {
      return res.status(400).json({ message: "Faltan datos obligatorios." });
    }

    // Verificar que el tipo de tarjeta sea válido
    if (!["Crédito", "Débito"].includes(card_type)) {
      return res.status(400).json({ message: "Tipo de tarjeta inválido." });
    }

    // Buscar la cuenta asociada
    const account = await AccountModel.findOne({
      where: { account_number },
    });

    if (!account) {
      return res.status(404).json({ message: "Cuenta no encontrada." });
    }

    // Generar un número de tarjeta aleatorio de 16 dígitos
    const generateCardNumber = () => {
      return Math.random().toString().slice(2, 19);
    };

    const card_number = generateCardNumber();

    // Calcular la fecha de expiración (+3 años)
    const expiry_date = parseInt(issue_date) + 3 * 365 * 24 * 60 * 60;

    // Determinar el balance y el límite de crédito según el tipo de tarjeta
    let cardBalance = 0;
    let cardCreditLimit = null;

    if (card_type === "Débito") {
      cardBalance = account.balance; // Tomar balance de la cuenta
      cardCreditLimit = 2000.00; // Límite por defecto para débito
    } else if (card_type === "Crédito") {
      if (!credit_limit) {
        return res.status(400).json({
          message: "Para tarjetas de crédito, el límite de crédito es obligatorio.",
        });
      }
      cardCreditLimit = parseFloat(credit_limit);
      cardBalance = cardCreditLimit; // Balance inicial igual al límite de crédito
    }

    // Crear la tarjeta
    const newCard = await CardModel.create({
      account_id: account.id,
      card_number,
      card_type,
      issue_date,
      expiry_date,
      credit_limit: cardCreditLimit,
      balance: cardBalance,
      status: "Pendiente",
    });

    return res.status(201).json({
      message: "Tarjeta creada exitosamente.",
      card: newCard,
    });
  } catch (error) {
    console.error("Error al crear la tarjeta:", error);
    return res.status(500).json({ message: "Error al crear la tarjeta." });
  }
};
