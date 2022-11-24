import express from "express";
import handlebars from "express-handlebars";
import MongoStore from "connect-mongo";
import session from "express-session";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
// const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
// mongodb+srv://matias:camion123@cluster0.gf4l1um.mongodb.net/sessions
app.use(
  session({
    secret: "34mf41dij89423djksd",
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost:27017/sesiones",
      // mongoOptions: advancedOptions,
      ttl: 600,
    }),
    resave: true,
    saveUninitialized: false,
  })
);

const hbs = handlebars.engine({
  extname: "hbs",
  layoutsDir: "./public/view/layouts",
});

app.engine("hbs", hbs);
app.set("views", "./public/view");
app.set("view engine", "hbs");

app.get("/", (req, res) => {
  if (req.session.user) {
    res.redirect("/logout");
  } else {
    res.render("main", { layout: "login" });
  }
});

app.post("/login", (req, res) => {
  req.session.user = req.body.nombre;
  res.redirect("/logout");
});

app.get("/logout", (req, res) => {
  if (!req.session.user) {
    res.redirect("/");
  } else {
    res.render("main", { layout: "logout", nombre: req.session.user });
  }
});

app.get("/desloguear", (req, res) => {
  res.render("main", { layout: "desloguear", nombre: req.session.user });
  req.session.destroy();
  // function time() {
  // //   res.redirect("/");
  // // }
  // // setTimeout(time, 2000);
});

app.post("/desloguear", (req, res) => {
  res.redirect("/");
});

app.listen(8080, (req, res) => {
  console.log("conectado");
});
