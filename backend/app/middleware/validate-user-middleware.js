import UserModel from '../models/user-model.js';

/*
 * @author
 * Mariano Camposeco {@literal (mariano1941@outlook.es)}
 */
const validateUserById = (source = 'body') => {
    return async (req, res, next) => {
        try {
            const { id } = source === 'query' ? req.query : req.body;

            if (!id) {
                return res.status(400).json({
                    message: `User ID is required in ${source}`
                });
            }

            const userModel = await UserModel.findByPk(id);

            if (!userModel) {
                return res.status(404).json({ message: 'User not found' });
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

export default validateUserById;
