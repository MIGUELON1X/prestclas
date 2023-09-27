import RoomsModel from "../models/Room.model.js";

export const createRoom = async (req, res) => {
  try {
    const { nombreSala, tipoSala, descripcion } = req.body;

    const roomId = await RoomsModel.createRoom(
      nombreSala,
      tipoSala,
      descripcion
    );

    if (roomId instanceof Error) {
      return res
        .status(500)
        .json({ message: "Error en roomId", error: roomId.message });
    } else {
      if (roomId !== null) {
        const roomData = await RoomsModel.sendToFrontend(roomId);

        if (roomData instanceof Error) {
          return res
            .status(500)
            .json({ message: "Error en roomData", error: roomData.error });
        } else {
          return res
            .status(201)
            .json({ message: "Sala creada", id: roomId, room: roomData});
        }
      }
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
