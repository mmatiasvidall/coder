import express from "express";
import { Server as HTTPServer } from "http";
import { Server as SocketServer } from "socket.io";
import handlebars from "express-handlebars";
import contenedor from "./contenedores/contenedor.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";

import pass from "./router/passport/pass.js";

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
const app = express();
const httpserver = new HTTPServer(app);
const io = new SocketServer(httpserver);

/////////////////////////////////////////
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
app.use(
  session({
    secret: "34mf41dij89423djksd",
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://matias:camion123@cluster0.abvq9si.mongodb.net/test",
      mongoOptions: advancedOptions,
      ttl: 600,
    }),
    resave: true,
    saveUninitialized: false,
  })
);

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
app.get("/", (req, res) => {
  if (!req.session.user) {
    res.redirect("/login");
  } else {
    res.render("main", { layout: "principal", nombre: req.session.user });
  }
});

app.get("/desloguear", (req, res) => {
  res.render("main", { layout: "desloguear", nombre: req.session.user });
  req.session.destroy();
});

app.post("/desloguear", (req, res) => {
  res.redirect("/");
});

app.use(pass);
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
httpserver.listen(8080, (req, res) => {
  console.log("Iniciando");
});
