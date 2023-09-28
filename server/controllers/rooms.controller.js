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

export const deleteRoom = async (req, res) => {
  try {
    const result = await RoomsModel.deleteRoom(req.params.id);

    if (result instanceof Error) {
      return res
        .status(500)
        .json({ message: "Error al eliminar la sala", error: result.message });
    } else if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Sala no encontrada" });
    } else {
      res.json({ message: "Sala eliminada" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error en roomsController", error: error.message });
  }
};

export const updateRoom = async (req, res) => {
  res.send("Actualizando sala");
};

export const getRooms = async (req, res) => {
  res.send("Obteniendo salas");
};

export const getRoom = async (req, res) => {
  res.send("Obteniendo sala");
};
