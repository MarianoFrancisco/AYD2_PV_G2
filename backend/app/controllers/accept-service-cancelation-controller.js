import ServiceCancellation from '../models/service_cancellations-model.js';
import LoanModel from '../models/loan-model.js';
import CardModel from '../models/card-model.js';
import AccountModel from '../models/account-model.js';
import { Op } from 'sequelize';

/**
 * 1er Endpoint: Obtener todas las filas de la tabla service_cancellations
 
export const getAllServiceCancellations = async (req, res) => {
  try {
    const serviceCancellations = await ServiceCancellation.findAll();
    res.status(200).json(serviceCancellations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las solicitudes de cancelación de servicios.' });
  }
};
*/

export const getAllServiceCancellations = async (req, res) => {
    try {
      // Obtener todas las filas de service_cancellations
      const serviceCancellations = await ServiceCancellation.findAll();
  
      // Crear un array para almacenar el resultado combinado
      const result = [];
  
      for (const cancellation of serviceCancellations) {
        // Buscar la cuenta asociada utilizando el modelo AccountModel
        const account = await AccountModel.findOne({
          where: { id: cancellation.account_id },
          attributes: ['account_number', 'cui', 'name', 'last_name', 'phone', 'email'],
        });
  
        // Combinar los datos de service_cancellations con los de accounts
        result.push({
          id: cancellation.id,
          account_id: cancellation.account_id,
          service: cancellation.service,
          reason: cancellation.reason,
          status: cancellation.status,
          created_at: cancellation.created_at,
          ...(account ? account.dataValues : { // Agregar datos de la cuenta si existe
            account_number: null,
            cui: null,
            name: null,
            last_name: null,
            phone: null,
            email: null,
          }),
        });
      }
  
      // Retornar el resultado combinado
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener las solicitudes de cancelación de servicios.' });
    }
  };


/**
 * 2do Endpoint: Actualizar el campo "status" en service_cancellations
 */
export const updateServiceCancellationStatus = async (req, res) => {
  const { service_cancellation_id, account_id } = req.body;

  try {
    // Buscar la solicitud de cancelación
    const cancellation = await ServiceCancellation.findOne({
      where: { id: service_cancellation_id },
    });

    if (!cancellation) {
      return res.status(404).json({ error: 'No se encontró la solicitud de cancelación especificada.' });
    }

    // Validaciones basadas en el tipo de servicio
    if (cancellation.service === 'Cuenta') {
      // Validar préstamos asociados a la cuenta
      const loans = await LoanModel.findAll({
        where: {
          account_id,
          state: { [Op.in]: ['Sin Pagar', 'Parcialmente Pagado'] },
        },
      });

      if (loans.length > 0) {
        cancellation.status = 'Rechazada';
        await cancellation.save();
        return res.status(200).json({ 
          message: 'Solicitud de cancelación rechazada debido a préstamos pendientes.' 
        });
      }
    } else if (cancellation.service === 'Tarjeta') {
      // Validar tarjetas de crédito asociadas a la cuenta
      const creditCards = await CardModel.findAll({
        where: {
          account_id,
          card_type: 'Crédito',
          status: 'Activa',
        },
      });

      for (const card of creditCards) {
        if (card.credit_limit !== card.balance) {
          cancellation.status = 'Rechazada';
          await cancellation.save();
          return res.status(200).json({ 
            message: 'Solicitud de cancelación rechazada debido a saldo pendiente en la tarjeta de crédito.' 
          });
        }
      }
    }

    // Si pasa las validaciones, procesar la solicitud
    cancellation.status = 'Procesada';
    await cancellation.save();
    return res.status(200).json({ 
      message: 'La solicitud de cancelación fue procesada exitosamente.' 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al procesar la solicitud de cancelación.' });
  }
};
