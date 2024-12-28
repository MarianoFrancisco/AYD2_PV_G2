import CardModel from '../models/card-model.js';
import AccountModel from '../models/account-model.js';

// Endpoint: Listar todas las tarjetas con los datos de cuentas asociadas
export const getCardsWithAccountDetails = async (req, res) => {
  try {
    // Consultar todas las tarjetas
    const cards = await CardModel.findAll();

    // Verificar si existen tarjetas
    if (cards.length === 0) {
      return res.status(404).json({ message: 'No se encontraron tarjetas registradas.' });
    }

    // Crear un arreglo con la información de las tarjetas y las cuentas asociadas
    const cardsWithAccountDetails = await Promise.all(
      cards.map(async (card) => {
        const account = await AccountModel.findByPk(card.account_id, {
          attributes: ['cui', 'name', 'last_name', 'phone', 'email', 'photo_path'],
        });

        return {
          ...card.toJSON(),
          accountDetails: account ? account.toJSON() : null, // Agregar los datos de la cuenta asociada
        };
      })
    );

    // Retornar la lista de tarjetas con los detalles de las cuentas
    res.status(200).json(cardsWithAccountDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocurrió un error al obtener las tarjetas con detalles de cuentas.' });
  }
};

// Endpoint: Modificar el estado de una tarjeta
export const updateCardStatus = async (req, res) => {
    const { id } = req.params; // Obtener el ID de la tarjeta desde los parámetros
    const { status } = req.body; // Obtener el nuevo estado desde el cuerpo de la solicitud
  
    try {
      // Validar el nuevo estado
      if (!['Activa', 'Rechazada'].includes(status)) {
        return res.status(400).json({
          error: "El campo 'status' solo puede ser 'Activa' o 'Rechazada'.",
        });
      }
  
      // Buscar la tarjeta
      const card = await CardModel.findByPk(id);
  
      // Verificar si existe la tarjeta
      if (!card) {
        return res.status(404).json({
          error: `No se encontró ninguna tarjeta con el ID ${id}.`,
        });
      }
  
      // Actualizar el estado
      card.status = status;
      await card.save();
  
      // Respuesta exitosa
      res.status(200).json({
        message: `El estado de la tarjeta con ID ${id} se actualizó a '${status}'.`,
        card, // Retornar los datos actualizados
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ocurrió un error al intentar actualizar el estado de la tarjeta.' });
    }
  };