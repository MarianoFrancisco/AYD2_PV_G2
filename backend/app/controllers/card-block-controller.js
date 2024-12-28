import CardModel from '../models/card-model.js';
import CardBlocks from '../models/card-block-model.js';
import AccountModel from '../models/account-model.js';
import sendEmail from '../services/send-mail-service.js'; // Servicio para enviar correos

// Endpoint 1: Obtener la pregunta y respuesta de seguridad según el número de tarjeta
export const getSecurityQuestionAndAnswer = async (req, res) => {
  try {
    const { card_number } = req.body;

    // Buscar la tarjeta por su número
    const card = await CardModel.findOne({ where: { card_number } });
    if (!card) {
      return res.status(404).json({ message: 'Tarjeta no encontrada.' });
    }

    // Obtener la cuenta asociada a la tarjeta
    const account = await AccountModel.findOne({ where: { id: card.account_id } });
    if (!account) {
      return res.status(404).json({ message: 'Cuenta no encontrada.' });
    }

    // Retornar la pregunta y respuesta de seguridad
    res.status(200).json({
      security_question: account.security_question,
      security_answer: account.security_answer,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error al obtener datos de seguridad.' });
  }
};

// Endpoint 2: Bloquear una tarjeta
export const blockCard = async (req, res) => {
  try {
    const { card_number, block_reason, blocked_at } = req.body;

    // Buscar la tarjeta por su número
    const card = await CardModel.findOne({ where: { card_number } });
    if (!card) {
      return res.status(404).json({ message: 'Tarjeta no encontrada.' });
    }

    // Insertar el bloqueo en la tabla "card_blocks"
    await CardBlocks.create({
      card_id: card.id,
      block_reason,
      blocked_at,
    });

    // Actualizar el estado de la tarjeta a "Bloqueado"
    await CardModel.update(
      { status: 'Bloqueado' },
      { where: { id: card.id } }
    );

    // Obtener la cuenta asociada para enviar el correo
    const account = await AccountModel.findOne({ where: { id: card.account_id } });
    if (!account) {
      return res.status(404).json({ message: 'Cuenta no encontrada.' });
    }

    // Enviar correo al cliente
    const subject = 'Bloqueo de tarjeta';
    const text = `Estimado ${account.name} ${account.last_name},\n\nSu tarjeta con número ${card_number} ha sido bloqueada exitosamente.\n\nRazón del bloqueo: ${block_reason}\nFecha de bloqueo: ${new Date(blocked_at).toLocaleString()}\n\nGracias por su atención.`;
    await sendEmail(account.email, subject, text);

    res.status(200).json({ message: 'Tarjeta bloqueada exitosamente y correo enviado.' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error al bloquear la tarjeta.' });
  }
};
