import express from "express";
import {
  deleteUser,
  updateUser,
  getAdminUsers,
} from "../controllers/user-management-controller.js";

const router = express.Router();

// Eliminar usuario
router.delete("/:id", deleteUser);

// Modificar usuario
router.put("/:id", updateUser);

// Obtener usuarios con rol "Administrador de Sistemas"
router.get("/", getAdminUsers);

export default router;