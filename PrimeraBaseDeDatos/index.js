import connection from "./dbConf.js";
import connectionLite from "./dbConfigLite.js";
import DBclass from "./contenedor.js";
const DB = new DBclass(connection, "productos");
const DBl = new DBclass(connectionLite, "mensajes");

import express from "express";
import { Server as HTTPServer } from "http";
import { Server as SocketServer } from "socket.io";
import handlebars from "express-handlebars";
const app = express();
const httpserver = new HTTPServer(app);
const io = new SocketServer(httpserver);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("views"));

const hbs = handlebars.engine({
  extname: "hbs",
  layoutsDir: "./views",
});

app.engine("hbs", hbs);
app.set("views", "./views");
app.set("view engine", "hbs");
/////////////////////////////////////////////////////
app.get("/", (req, res) => {
  res.render("main", { layout: "principal" });
});
/////////////////////////////////////////////////////
io.on("connection", async function (socket) {
  const mensajes = await DBl.getAll();
  const productos = await DB.getAll();
  console.log("usuario conectado");
  socket.emit("mensajes", mensajes);
  socket.emit("productos", productos);

  socket.on("new_msg", async (data) => {
    await DBl.insertProd(data);
    io.sockets.emit("mensajes", mensajes);
  });
  socket.on("new_producto", async (prod) => {
    await DB.insertProd(prod);
    io.sockets.emit("productos", productos);
  });
});
/////////////////////////////////////////////////////
httpserver.listen(8080, (req, res) => {
  console.log("Iniciando");
});
