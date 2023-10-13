import { Router } from "express";
import {
  createRoom,
  getRoom,
  getRooms,
  updateRoom,
  deleteRoom,
} from "../controllers/rooms.controller.js";
import { adminAuth, auth } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/rooms", adminAuth, getRooms);
router.get("/rooms/:id", adminAuth, getRoom);
router.post("/rooms", adminAuth, createRoom);
router.put("/rooms/:id", adminAuth, updateRoom);
router.delete("/rooms/:id", adminAuth, deleteRoom);

export default router;
