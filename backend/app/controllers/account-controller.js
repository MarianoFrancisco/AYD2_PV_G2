import AccountModel from "../models/account-model.js";
import sequelize from "../../config/database-connection.js";


const getBalance = async (req, res) => {

    const { accountNumber } = req.params

    try {
        const bank_accounts = await AccountModel.findOne({
            where: {
                account_number: accountNumber,
            }

        })

        res.status(200).json({
            "Saldo": bank_accounts.balance,
            "Fecha": bank_accounts.created_at
        });

    } catch (error) {
        res.status(500).json({ message: 'Error fetching accounts: ' + error.message });
    }


}

export {
    getBalance
}



