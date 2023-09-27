import { Router } from "express";
import { createRoom } from "../controllers/rooms.controller.js";

const router = Router();

router.post("/rooms", createRoom);

export default router;
