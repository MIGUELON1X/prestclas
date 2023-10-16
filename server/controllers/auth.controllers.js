import { createAdminToken, createUserToken } from "../libs/jwt.js";
import { TOKEN_SECRET, ADMIN_TOKEN_SECRET } from "../config.js";
import jwt from "jsonwebtoken";
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
        usuario,
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
        usuario: user[0].usuario,
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

export const verifyToken = async (req, res) => {
  try {
    console.log(req.user);

    const { token } = req.cookies;
    if (!token) return res.send(false);

    jwt.verify(token, TOKEN_SECRET, (error, user) => {
      if (error) {
        jwt.verify(token, ADMIN_TOKEN_SECRET, (error, user) => {
          if (error) return res.sendStatus(401);

          const userFound = UserModel.findById(req.user);

          return res.json({
            id: userFound[0].id,
            usuario: userFound[0].usuario,
          });
        });
      }
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al verificar el token", error: error.message });
  }
};

export const logout = async (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};
