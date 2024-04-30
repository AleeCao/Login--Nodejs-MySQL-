import { config } from "dotenv"; // Importo la función config de dotenv, que me permite leer las variables de entorno
config(); // Ejecuto la función config, para que lea el archivo .env

export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_USER = process.env.DB_USER || "root";
export const DB_PASSWORD = process.env.DB_PASSWORD || "password";
export const DB_PORT = process.env.DB_PORT || 3306;
export const DB_DATABASE = process.env.DB_DATABASE || "abcDB";