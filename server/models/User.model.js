import db from "../db.js";

const User = {};

User.createUser = async (nombre, usuario, correo, contraseña) => {
  try {
    const [response] = await db.query(
      "INSERT INTO usuarios (nombre, usuario, correo, contraseña) VALUES (?,?,?,?)",
      [nombre, usuario, correo, contraseña]
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
