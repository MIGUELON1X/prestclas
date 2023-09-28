import RoomsModel from "../models/Room.model.js";

export const createRoom = async (req, res) => {
  const { nombre, tipo, descripcion } = req.body;

  try {
    const taskId = await RoomsModel.createRoom(nombre, tipo, descripcion);

    if (taskId instanceof Error) {
      return res
        .status(500)
        .json({ message: "Error en taskId", error: taskId.message });
    } else {
      return res.status(200).json({ id: taskId, nombre, tipo, descripcion });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error en roomsControllers", error: error.message });
  }
};
