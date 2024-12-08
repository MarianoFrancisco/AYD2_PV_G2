/*
 * @author
 * Mariano Camposeco {@literal (mariano1941@outlook.es)}
 */
import UserModel from '../models/user-model.js';

const validateUser = (source = 'body') => {
    return async (req, res, next) => {
        try {
            const { cui, pin } = source === 'query' ? req.query : req.body;

            if (!cui || !pin) {
                return res.status(400).json({
                    message: `CUI and PIN are required in ${source}`
                });
            }

            const userModel = await UserModel.findOne({
                where: { cui }
            });

            if (!userModel) {
                return res.status(404).json({ message: 'User not found' });
            }

            if (userModel.pin !== pin) {
                return res.status(401).json({ message: 'Invalid PIN' });
            }

            req.userModel = userModel;
            next();
        } catch (error) {
            res.status(500).json({
                message: `Error validating user from ${source}`,
                error: error.message
            });
        }
    };
};

export default validateUser;
