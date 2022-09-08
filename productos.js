const express = require("express");
const fs = require("fs");
const { Router } = express;
const router = Router();

router.get("/", (req,res) => {
  const data = fs.readFileSync("./Productos.json", "utf-8");
  const productos = JSON.parse(data);
  res.send(productos);
});

router.get("/:id", (req,res) => {
  try { 
  const data = fs.readFileSync('./Productos.json', 'utf-8');
  const productos = JSON.parse(data);
  const {id} = req.params;
  const index = productos.indexOf(productos[id - 1])
  res.send(productos[index])
  } catch(err) {
    res.status(404).send(err.msg);
  }
});

router.post("/", (req, res) => {
  try { 
  const data = fs.readFileSync('./Productos.json', 'utf-8');
  const producto = JSON.parse(data);
  const id = producto.length + 1;
  const {title, price, thumbnail} = req.body;
  const productoNuevo = ({title,price,thumbnail});
  productoNuevo.id = id;
  producto.push(productoNuevo);
  const productosString = JSON.stringify(producto);
  fs.writeFileSync("./Productos.json", productosString);
  res.send(`Su producto se agrego correctamente con la id numero ${id}`)
  } catch(err) {
    res.send(err.msg)
  }
});

router.delete('/:id', (req,res) => {
  const data = fs.readFileSync('./Productos.json', 'utf-8');
  const productos = JSON.parse(data);
  const {id} = req.params;
  const index = productos.indexOf(productos[id - 1])
  productos.splice(index, 1)
  const productosString = JSON.stringify(productos);
  fs.writeFileSync("./Productos.json", productosString);
  res.send("Se elminio correctamente")
});

router.put("/:id", (req, res) => {
  const data = fs.readFileSync('./Productos.json', 'utf-8');
  const productos = JSON.parse(data);
  try {
    const {id} = req.params;
    const index = productos.indexOf(productos[id - 1])
    productos.splice(index, 1)
    const {title, price, thumbnail} = req.body;
    const productoNuevo = ({title,price,thumbnail});
    productoNuevo.id = id;
    productos.splice(index,0,productoNuevo)
    const productosString = JSON.stringify(productos);
    fs.writeFileSync("./Productos.json", productosString);
    res.send("Se modifico con exito")
  } catch (err) {
    res.status(404).send(err.msg);
  }
});

module.exports = router;