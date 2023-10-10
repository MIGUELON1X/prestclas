import { createAdminToken, createUserToken } from "../libs/jwt.js";
import UserModel from "../models/User.model.js";

export const register = async (req, res) => {
  try {
    const { nombre, usuario, correo, contraseña } = req.body;

    const userId = await UserModel.createUser(
      nombre,
      usuario,
      correo,
      contraseña
    );

    if (userId instanceof Error) {
      return res
        .status(500)
        .json({ message: "Error en userId", error: userId.message });
    } else {
      const payload = {
        id: userId,
      };

      if (userId === 1) {
        payload.rol = "Admin";
        const token = await createAdminToken(payload);
        res.cookie("token", token);
      } else {
        payload.rol = "Usuario";
        const token = await createUserToken(payload);
        res.cookie("token", token);
      }
      return res.status(201).json({
        id: userId,
        nombre,
        usuario,
        correo,
      });
    }
  } catch (error) {
    return res.json({ message: "Usario no creado", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;
  } catch (error) {}
};
