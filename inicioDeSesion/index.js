import express from "express";
import { Server as HTTPServer } from "http";
import { Server as SocketServer } from "socket.io";
import handlebars from "express-handlebars";
import contenedor from "./contenedores/contenedor.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import { Strategy } from "passport-local";
import bcrypt from "bcrypt";

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
const DBU = new contenedor("usuarios", {
  username: String,
  password: String,
});

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

passport.serializeUser((user, done) => {
  done(null, user._id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await DBU.findByid(id);
    done(null, user);
  } catch (e) {
    done(e);
  }
});

//////////Handlebars////////////////////
const hbs = handlebars.engine({
  extname: "hbs",
  layoutsDir: "./public/views",
});

//////////Views Engine/////////////////
app.engine("hbs", hbs);
app.set("views", "./public/views");
app.set("view engine", "hbs");

//////////Funciones//////////////////
app.get("/api/productos-test", (req, res) => {
  const lista = DBP.faker();
  res.render("main", { layout: "test", productos: lista });
});

app.get("/", (req, res) => {
  if (!req.session.user) {
    res.redirect("/login");
  } else {
    res.render("main", { layout: "principal", nombre: req.session.user });
  }
});

const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

passport.use(
  "register",
  new Strategy(
    { passReqToCallback: true },
    async (req, username, password, done) => {
      try {
        const userExist = await DBU.findOne({ username, password });
        if (userExist) return done(null, false);
        const user = { username, password: hashPassword(password) };
        const createUser = await DBU.save(user);
        return done(null, createUser);
      } catch (e) {
        return done(e);
      }
    }
  )
);

passport.use(
  "login",
  new Strategy(
    { passReqToCallback: true },
    async (req, username, password, done) => {
      await DBU.findOne({ username, password }, (err, user) => {
        if (err) return done(err);
        if (!user) return done(null, false);
        done(null, user);
      });
    }
  )
);

app.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/errorlogin" }),
  (req, res) => {
    req.session.user = req.body.username;
    res.redirect("/");
  }
);

app.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/errorregister" }),
  (req, res) => {
    req.session.user = req.body.username;
    res.redirect("/");
  }
);

app.get("/login", (req, res) => {
  if (req.session.user) res.redirect("/");
  if (!req.session.user) res.render("main", { layout: "login" });
});

app.get("/register", (req, res) => {
  if (req.session.user) res.redirect("/");
  if (!req.session.user) res.render("main", { layout: "register" });
});

app.get("/errorlogin", (req, res) => {
  res.render("main", { layout: "/errorlogin" });
});

app.get("/errorregister", (req, res) => {
  res.render("main", { layout: "errorregister" });
});

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
