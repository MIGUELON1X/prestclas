import express from "express";
import morgan from "morgan";
import notFoundRoutes from "./routes/notFound.routes.js";
import authRoutes from "./routes/auth.routes.js";
import roomsRoutes from "./routes/rooms.routes.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));
app.use("/api", authRoutes);
app.use("/api", roomsRoutes);
app.use(notFoundRoutes);

export default app;
