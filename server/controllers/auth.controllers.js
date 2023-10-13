import { createAdminToken, createUserToken } from "../libs/jwt.js";
import bcrypt from "bcryptjs";
import UserModel from "../models/User.model.js";

export const register = async (req, res) => {
  try {
    const { nombre, usuario, correo, contraseña } = req.body;

    const contraseñaEcnriptada = await bcrypt.hash(contraseña, 10);

    const userId = await UserModel.register(
      nombre,
      usuario,
      correo,
      contraseñaEcnriptada
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

    const user = await UserModel.login(correo);

    if (user instanceof Error) {
      res
        .status(500)
        .json({ message: "Error al obtener el usuario", error: user.message });
    } else if (user.length === 0) {
      res.status(404).json({ message: "Usuario no encontrado" });
    } else {
      const isMatch = await bcrypt.compare(contraseña, user[0].contraseña);

      if (!isMatch)
        return res.status(400).json({ message: "Contraseña incorrecta" });

      const payload = {
        id: user[0].id,
      };

      if (user[0].id === 1) {
        payload.rol = "Admin";
        const token = await createAdminToken(payload);
        res.cookie("token", token);
      } else {
        payload.rol = "Usuario";
        const token = await createUserToken(payload);
        res.cookie("token", token);
      }

      return res.json({
        id: user[0].id,
        nombre: user[0].nombre,
        usuario: user[0].usuario,
        correo: user[0].correo,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener el usuario", error: error.message });
  }
};
