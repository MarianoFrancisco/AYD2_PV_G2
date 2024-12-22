import UserModel from "../models/user-model.js";

// 1. Eliminar un usuario con rol "Administrador de Sistemas"
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UserModel.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    if (user.role !== "Administrador de Sistemas") {
      return res.status(403).json({
        message: "Solo se pueden eliminar usuarios con el rol de 'Administrador de Sistemas'.",
      });
    }

    await UserModel.destroy({ where: { id } });

    return res.status(200).json({ message: "Usuario eliminado correctamente." });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    return res.status(500).json({
      message: "Ocurrió un error al eliminar el usuario.",
    });
  }
};

// 2. Modificar un usuario con rol "Administrador de Sistemas"
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const user = await UserModel.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    if (user.role !== "Administrador de Sistemas") {
      return res.status(403).json({
        message: "Solo se pueden modificar usuarios con el rol de 'Administrador de Sistemas'.",
      });
    }

    await UserModel.update(updates, { where: { id } });

    return res.status(200).json({ message: "Usuario actualizado correctamente." });
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    return res.status(500).json({
      message: "Ocurrió un error al actualizar el usuario.",
    });
  }
};

// 3. Obtener usuarios con rol "Administrador de Sistemas"
export const getAdminUsers = async (req, res) => {
  try {
    const adminUsers = await UserModel.findAll({
      where: { role: "Administrador de Sistemas" },
    });

    if (!adminUsers || adminUsers.length === 0) {
      return res.status(404).json({
        message: "No se encontraron usuarios con el rol de 'Administrador de Sistemas'.",
      });
    }

    return res.status(200).json(adminUsers);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return res.status(500).json({
      message: "Ocurrió un error al obtener los usuarios.",
    });
  }
};
