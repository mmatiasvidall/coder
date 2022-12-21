import express from "express";
import fs from "fs";
const app = express();
import handlebars from "express-handlebars";
import router from "./daos/productos/productosArchivo.js";
import carritoRouter from "./daos/carritos/carritoArchivo.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/productos", router);
app.use("/api/carrito", carritoRouter);

const hbs = handlebars.engine({
  extname: "hbs",
  layoutsDir: "../views/layouts/",
});

app.engine("hbs", hbs);
app.set("views", "../views");
app.set("view engine", "hbs");

app.get("/api/productos", (req, res) => {
  const data = fs.readFileSync("../DB/Productos.json", "utf-8");
  const productos = JSON.parse(data);
  res.render("main", { layout: "tarjetas", productos: productos });
});
app.get("*", function (req, res) {
  res.send(404, "Ruta no existente");
});

app.listen(8080, (req, res) => {
  console.log("conectado");
});
