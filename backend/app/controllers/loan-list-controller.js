import LoanModel from '../models/loan-model.js';

const getLoansByAccount = async (req, res) => {
    const { account_id } = req.params;

    // Validar que se reciba el `account_id`
    if (!account_id) {
        return res.status(400).json({ message: 'Account ID is required' });
    }

    try {
        // Buscar préstamos asociados al `account_id`
        const loans = await LoanModel.findAll({
            where: { account_id },
            attributes: [
                'id',
                'account_id',
                'loan_type',
                'remaining_balance',
                'interest_rate',
                'state',
                'created_at'
            ]
        });

        // Verificar si hay préstamos asociados
        if (loans.length === 0) {
            return res.status(404).json({ message: 'No loans found for the provided account ID' });
        }

        // Responder con los préstamos encontrados
        res.status(200).json({ message: 'Loans retrieved successfully', loans });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving loans', error: error.message });
    }
};

export {
    getLoansByAccount
};
