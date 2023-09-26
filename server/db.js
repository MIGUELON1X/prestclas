import { createPool } from "mysql2/promise";

const db = createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "prestclass",
});

export default db;
