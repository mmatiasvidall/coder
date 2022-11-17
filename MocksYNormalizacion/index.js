import DBclass from "./contenedores/contenedor.js";
import DBClass from "./contenedores/contenedorArchivos.js";
const DBM = new DBClass("./DB/msj.json");
const DBP = new DBclass("productos", {
  nombre: String,
  precio: Number,
  logo: String,
});

import randomProd from "./faker.js";
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

app.get("/api/productos-test", (req, res) => {
  const lista = [];
  for (let i = 0; i < 5; i++) {
    lista.push(randomProd());
  }
  res.render("main", { layout: "test", productos: lista });
});
/////////////////////////////////////////////////////
io.on("connection", async function (socket) {
  const mensajes = DBM.getAll();
  const productos = await DBP.getAll();
  socket.emit("mensajes", mensajes);
  socket.emit("productos", productos);

  socket.on("new_msg", (data) => {
    DBM.save(data);
    io.sockets.emit("mensajes", mensajes);
  });
  socket.on("new_producto", async (prod) => {
    await DBP.insertProd(prod);
    io.sockets.emit("productos", productos);
  });
});
/////////////////////////////////////////////////////
httpserver.listen(8080, (req, res) => {
  console.log("Iniciando");
});
