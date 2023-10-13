import jwt from "jsonwebtoken";
import { TOKEN_SECRET, ADMIN_TOKEN_SECRET } from "../config.js";

export const auth = (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token)
      return res.status(401).json({ message: "No autorizado, inicie sesión" });

    jwt.verify(token, TOKEN_SECRET, (error, user) => {
      if (error) {
        jwt.verify(token, ADMIN_TOKEN_SECRET, (error, user) => {
          if (error) return res.status(401).json({ message: "No autorizado" });

          req.user = user;
          next();
        });
      }

      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: "Error al validar el token" });
  }
};

export const adminAuth = (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token)
      return res.status(401).json({ message: "No autorizado, inicie sesión" });

    jwt.verify(token, ADMIN_TOKEN_SECRET, (error, user) => {
      if (error) return res.status(401).json({ message: "No autorizado" });

      req.user = user;
      next();
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al validar el token.", error: error.message });
  }
};
