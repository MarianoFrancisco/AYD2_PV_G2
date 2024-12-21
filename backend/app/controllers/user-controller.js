import UserModel from "../models/user-model.js";

/*
 * @author
 * Mariano Camposeco {@literal (mariano1941@outlook.es)}
 */
const updateUserRole = async (req, res) => {
    const { id, role } = req.body;

    if (!id || !role) {
        return res.status(400).json({ message: 'User ID and role are required.' });
    }

    const allowedRoles = ['Cajero', 'Atención al Cliente'];
    if (!allowedRoles.includes(role)) {
        return res.status(400).json({ message: `Role must be one of the following: ${allowedRoles.join(', ')}.` });
    }

    try {
        const user = await UserModel.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        user.role = role;
        await user.save();

        res.json({ message: 'User role updated successfully.', user: { id: user.id, name: user.name, role: user.role } });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user role: ' + error.message });
    }
};

export {
    updateUserRole
};