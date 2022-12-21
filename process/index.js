import express from "express";
import { Server as HTTPServer } from "http";
import { Server as SocketServer } from "socket.io";
import handlebars from "express-handlebars";
import contenedor from "./contenedores/contenedor.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import minimist from "minimist";
import * as dotenv from "dotenv";

import pass from "./router/pass.js";
import principal from "./router/principal.js";
import proces from "./router/process.js";

const DBP = new contenedor("productos", {
  nombre: String,
  precio: Number,
  logo: String,
});
const DBM = new contenedor("mensajes", {
  nombre: String,
  msj: String,
  date: String,
});

/////////////////////////////////////////
dotenv.config({});
const app = express();
const httpserver = new HTTPServer(app);
const io = new SocketServer(httpserver);

/////////////////////////////////////////
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

app.use(
  session({
    secret: process.env.SECRET.toLowerCase(),
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://" +
        process.env.USERNAME.toLowerCase() +
        ":" +
        process.env.PASSWORD.toLowerCase() +
        "@" +
        process.env.MONGO_URL.toLowerCase(),
      mongoOptions: advancedOptions,
      ttl: 600,
    }),
    resave: true,
    saveUninitialized: false,
  })
);

/////////////////////////////////////////
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(passport.initialize());
app.use(passport.session());
//////////Handlebars////////////////////
const hbs = handlebars.engine({
  extname: "hbs",
  layoutsDir: "./public/views",
});

//////////Views Engine/////////////////
app.engine("hbs", hbs);
app.set("views", "./public/views");
app.set("view engine", "hbs");

//////////Funciones////////////////////
app.use(principal);
app.use(pass);
app.use(proces);
///////////Socket/////////////////////
io.on("connection", async function (socket) {
  const mensajes = await DBM.getAll();
  const productos = await DBP.getAll();
  socket.emit("mensajes", mensajes);
  socket.emit("productos", productos);

  socket.on("new_msg", async (data) => {
    await DBM.save(data);
    io.sockets.emit("mensajes", mensajes);
  });
  socket.on("new_producto", async (prod) => {
    await DBP.save(prod);
    io.sockets.emit("productos", productos);
  });
});
//////////////Starting/////////////////
const options = {
  alias: { p: "PORT" },
  default: { PORT: 8080 },
};

const { PORT } = minimist(process.argv.slice(2), options);

httpserver.listen(PORT, (req, res) => {
  console.log("Iniciando");
});
