import LoanModel from '../models/loan-model.js';
import AccountModel from '../models/account-model.js';

const getLoansByAccount = async (req, res) => {
    const { account_number } = req.params;

    if (!account_number) {
        return res.status(400).json({ message: 'Account Number is required' });
    }

    try {
        const account = await AccountModel.findOne({
            where: { account_number },
            attributes: ['id']
        });

        if (!account) {
            return res.status(404).json({ message: 'No account found for the provided account number' });
        }

        const loans = await LoanModel.findAll({
            where: { account_id: account.id },
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

        if (loans.length === 0) {
            return res.status(404).json({ message: 'No loans found for the provided account number' });
        }

        res.status(200).json({ message: 'Loans retrieved successfully', loans });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving loans', error: error.message });
    }
};

export {
    getLoansByAccount
};
