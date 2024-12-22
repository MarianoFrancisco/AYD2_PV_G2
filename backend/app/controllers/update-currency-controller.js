import AccountModel from "../models/account-model.js";

export const updateCurrency = async (req, res) => {
  const { account_number } = req.body;

  try {
    // Buscar la cuenta por el account_number
    const account = await AccountModel.findOne({
      where: { account_number },
    });

    // Validar si la cuenta existe
    if (!account) {
      return res.status(400).json({ error: "La cuenta no existe." });
    }

    // Validar si el currency ya está en "Quetzales y Dólares"
    if (account.currency === "Quetzales y Dólares") {
      return res
        .status(400)
        .json({ error: "La cuenta ya está configurada en Quetzales y Dólares." });
    }

    // Actualizar el campo currency
    account.currency = "Quetzales y Dólares";
    await account.save();

    // Retornar la respuesta con los detalles de la cuenta actualizados
    return res.status(200).json({
      message: "La cuenta se actualizó a Quetzales y Dólares correctamente.",
      account_details: {
        account_number: account.account_number,
        name: account.name,
        last_name: account.last_name,
        account_type: account.account_type,
        currency: account.currency,
        balance: account.balance,
      },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Ocurrió un error al actualizar la cuenta." });
  }
};
