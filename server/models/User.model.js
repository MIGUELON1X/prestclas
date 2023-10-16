import db from "../db.js";

const User = {};

User.register = async (nombre, usuario, correo, contraseña) => {
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

User.login = async (correo) => {
  try {
    const [user] = await db.query("SELECT * FROM usuarios WHERE correo = ?", [
      correo,
    ]);

    return user;
  } catch (error) {
    return new Error(error.message);
  }
};

User.findById = async (id) => {
  try {
    const [user] = await db.query("SELECT * FROM usuarios WHERE id = ?", [id]);

    console.log(user);

    return user;
  } catch (error) {
    return new Error(error.message);
  }
};

export default User;
