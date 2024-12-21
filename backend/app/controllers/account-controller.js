import AccountModel from "../models/account-model.js";

const getBalance = async (req, res) => {

    const userModel = req.userModel;

    try {
        //Se busca el
        const accountModel = await AccountModel.findOne({
            where: {
                user_id: userModel.id
            }
        })

        res.status(200).json({
            "Saldo": accountModel.balance,
            "Fecha": accountModel.update_balance_at
        });

    } catch (error) {
        res.status(500).json({ message: 'Error fetching accounts: ' + error.message });
    }


}

export {
    getBalance
}