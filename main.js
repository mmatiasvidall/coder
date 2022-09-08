const express = require("express");
const app = express();
const productosRouter = require("./productos");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/productos", productosRouter);
app.use("/", express.static(__dirname + "/assets"));

const server = app.listen(8080, () => {
    console.log(`servidor iniciado`)
}); 