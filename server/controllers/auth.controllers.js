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

    console.log(userId);

    return res.send("Usuario creado");
  } catch (error) {
    return res.json({message: "Usario no creado", error: error.message});
  }
};
