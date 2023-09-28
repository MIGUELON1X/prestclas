import db from "../db.js";

const Rooms = {};

Rooms.createRoom = async (nombreSala, tipoSala, descripcion) => {
  try {
    const [response] = await db.query(
      "INSERT INTO salas (nombre, tipo_de_sala, descripcion) VALUES (?,?,?)",
      [nombreSala, tipoSala, descripcion]
    );

    return response.insertId;
  } catch (error) {
    return new Error(error.message);
  }
};

Rooms.deleteRoom = async (id) => {
  try {
    const [response] = await db.query("DELETE FROM salas WHERE id = ?", [id]);

    return response;
  } catch (error) {
    return new Error(error.message);
  }
};

export default Rooms;
