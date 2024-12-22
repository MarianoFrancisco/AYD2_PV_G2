import CardModel from '../models/card-model.js';

const getCreditCards = async (req, res) => {
    const { account_id } = req.params;

    // Validar que se reciba el `account_id`
    if (!account_id) {
        return res.status(400).json({ message: 'Account ID is required' });
    }

    try {
        // Buscar tarjetas de crédito asociadas al `account_id`
        const creditCards = await CardModel.findAll({
            where: {
                account_id,
                card_type: 'Crédito'
            },
            attributes: [
                'card_number',
                'card_type',
                'issue_date',
                'expiry_date',
                'credit_limit',
                'balance',
                'active'
            ]
        });

        // Verificar si hay tarjetas de crédito asociadas
        if (creditCards.length === 0) {
            return res.status(404).json({ message: 'No credit cards found for the provided account ID' });
        }

        // Generar la respuesta con el mensaje adicional
        const cardsWithStatus = creditCards.map(card => {
            const status =
                card.credit_limit === card.balance
                    ? 'Está al día'
                    : `Debe pagar ${(card.credit_limit - card.balance).toFixed(2)}`;
            return {
                card_number: card.card_number,
                card_type: card.card_type,
                issue_date: card.issue_date,
                expiry_date: card.expiry_date,
                credit_limit: card.credit_limit,
                balance: card.balance,
                active: card.active,
                status
            };
        });

        // Responder con las tarjetas y su estado
        res.status(200).json({
            message: 'Credit cards retrieved successfully',
            credit_cards: cardsWithStatus
        });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving credit cards', error: error.message });
    }
};

export {
    getCreditCards
};
