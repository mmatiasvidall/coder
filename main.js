const express = require('express')
const fs = require('fs');

const app = express();

app.get("/productos", (req, res) => {
    const data = fs.readFileSync('./productos.json', 'utf-8');
    const productos = JSON.parse(data);
    res.send(productos);
});
app.get("/productoRandom", (req, res) => {
    const data = fs.readFileSync('./productos.json', 'utf-8');
    const productos = JSON.parse(data);
    const aleatorio = productos[Math.floor(Math.random() * productos.length)];
    res.send(aleatorio);
});


const server = app.listen(8080, () => {
    console.log(`servidor iniciado`)
});