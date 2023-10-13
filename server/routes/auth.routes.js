import { Router } from "express";
import { login, register } from "../controllers/auth.controllers.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/profile", login);
router.post("/logout", login);

export default router;