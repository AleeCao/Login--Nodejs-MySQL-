import express from "express";
import { engine } from "express-handlebars";
import { router } from "../routes/login.Routes.js";
import session from "express-session";
import path from "path";

const app = express();
const __dirname = import.meta.dirname; //Para que __dirname funcione en ES6

app.set("views", path.join(__dirname, "../views")); //Configuración de handlebars, para que busque las vistas en la carpeta views
app.engine("hbs", engine({ extname: "hbs" })); //Configuración de handlebars, lo que hace es que los archivos .hbs se rendericen como html. El extname es para que no sea necesario poner la extensión en el archivo
app.set("view engine", "hbs"); //Configuración de handlebars, para que use el motor de renderizado hbs
app.use(express.urlencoded({ extended:true })); //Para poder recibir datos de formularios
app.use(express.json()); //Para poder recibir datos en formato json
app.use(session({
  secret: "secret",
  resave: true,
  saveUninitialized: true
}));

app.use(router); //Rutas

app.use((req, res, next) => { // Middleware para manejar rutas no encontradas.
  res.status(404).send("Endpoint not found.");
});
export { app };