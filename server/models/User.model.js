import db from "../db.js";
import bcrypt from "bcryptjs";


const User = {};

User.createUser = async (nombre, usuario, correo, contraseña) => {
  try {
    const contraseñaEcnriptada = await bcrypt.hash(contraseña, 10);


    const [response] = await db.query(
      "INSERT INTO usuarios (nombre, usuario, correo, contraseña) VALUES (?,?,?,?)",
      [nombre, usuario, correo, contraseñaEcnriptada]
    );

    console.log(response.insertId);

    return response.insertId;
  } catch (error) {
    return new Error(error.message);
  }
};

User.sendToFrontend = async (id) => {
  try {
    const [response] = await db.query(
      "SELECT nombre, usuario, correo FROM usuarios WHERE id = ?",
      [id]
    );

    return response[0];
  } catch (error) {
    return new Error(error.message);
  }
};

export default User;
