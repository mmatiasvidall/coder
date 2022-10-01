const express = require("express");
const fs = require("fs")
const app = express();
const handlebars = require('express-handlebars');
const productosRouter = require("./productos");
const carritoRouter = require("./carrito");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/productos", productosRouter);
app.use("/api/carrito", carritoRouter);

const hbs = handlebars.engine({
    extname: "hbs",
    layoutsDir: "./views/layout",
});

app.engine("hbs", hbs)
app.set("views", "./views");
app.set("view engine", "hbs");

app.get('/api/productos', (req,res) => {
    const data = fs.readFileSync("./productos.json" , "utf-8")
    const productos = JSON.parse(data)
    res.render("main", {layout: "tarjetas", productos: productos});
});
app.listen(8080, (req,res) => {
    console.log("conectado")
});
