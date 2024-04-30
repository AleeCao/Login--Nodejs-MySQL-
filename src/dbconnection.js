import { createPool } from "mysql2/promise";
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } from "./config.js";

const dbconnection = createPool({
  host: "localhost",
  user: "root",
  password: "alepassword",
  database: "logindb",
  port: 3306,
});

export { dbconnection };