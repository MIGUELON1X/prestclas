import { Router } from "express";
import { createRoom, getRoom, getRooms, updateRoom, deleteRoom } from "../controllers/rooms.controller.js";

const router = Router();

router.get("/rooms", getRooms);
router.get("/rooms/:id", getRoom);
router.post("/rooms", createRoom);
router.put("/rooms/:id", updateRoom);
router.delete("/rooms/:id", deleteRoom);

export default router;
