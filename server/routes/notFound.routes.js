import { Router } from "express";
import { notFound } from "../controllers/notFound.controllers.js";

const router = Router();

router.get("*", notFound);

export default router;
