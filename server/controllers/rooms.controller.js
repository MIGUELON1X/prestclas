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
      return res.json({ id: taskId, nombre, tipo, descripcion });
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
  try {
    const rooms = await RoomsModel.getRooms();

    if (rooms instanceof Error) {
      return res
        .status(500)
        .json({ message: "Error al obtener las salas", error: rooms.message });
    } else if (rooms.length === 0) {
      return res.status(404).json({ message: "Aún no hay salas creadas" });
    } else {
      return res.json(rooms);
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener las salas", error: error.message });
  }
};

export const getRoom = async (req, res) => {
  try {
    const room = await RoomsModel.getRoom(req.params.id);

    if (room instanceof Error) {
      return res.status(500).json({message: "Error al obtener la sala", error: room.message})
    } else if (room.length === 0) {
      return res.status(404).json({message: "Tarea no encontrada"})
    } else {
      return res.json(room[0])
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener la sala", error: error.message });
  }
};
