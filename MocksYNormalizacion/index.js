import connection from "./conf/dbConf.js";
import connectionLite from "./conf/dbConfigLite.js";
import DBclass from "./contenedor.js";
const DB = new DBclass(connection, "productos");
const DBl = new DBclass(connectionLite, "mensajes");

import randomProd from "./faker.js";
import express from "express";
import { Server as HTTPServer } from "http";
import { Server as SocketServer } from "socket.io";
import handlebars from "express-handlebars";
import productos from "./faker.js";
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

app.get("/api/productos-test", (req, res) => {
  const lista = [];
  for (let i = 0; i < 5; i++) {
    lista.push(randomProd());
  }
  res.render("main", { layout: "test", productos: lista });
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
