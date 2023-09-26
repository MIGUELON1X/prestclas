import UserModel from "../models/User.model.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    const { nombre, usuario, correo, contraseña } = req.body;

    const contraseñaEcnriptada = await bcrypt.hash(contraseña, 10);

    const userId = await UserModel.createUser(
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
      if (userId !== null) {
        const userData = await UserModel.sendToFrontend(userId);

        if (userData instanceof Error) {
          return res
            .status(500)
            .json({ message: "Error en userData", error: userData.message });
        } else {
          return res
            .status(201)
            .json({ message: "Usuario creado", user: userData });
        }
      }
    }

    return res.send("Usuario creado");
  } catch (error) {
    return res.json({ message: "Usario no creado", error: error.message });
  }
};
