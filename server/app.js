import express from "express";
import morgan from "morgan";
import notFoundRoutes from "./routes/notFound.routes.js";
import authRoutes from "./routes/auth.routes.js";
import roomsRoutes from "./routes/rooms.routes.js";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(authRoutes);
app.use(roomsRoutes);
app.use(notFoundRoutes);

export default app;
