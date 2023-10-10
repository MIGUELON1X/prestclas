import { TOKEN_SECRET, ADMIN_TOKEN_SECRET } from "../config.js";
import jwt from "jsonwebtoken";

export const createUserToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, TOKEN_SECRET, { expiresIn: "1d" }, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
};

export const createAdminToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, ADMIN_TOKEN_SECRET, { expiresIn: "1d" }, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
};
