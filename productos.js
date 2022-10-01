const express = require('express')
const {Router} = express;
const router  = Router();
const Contenedor = require("./class");
const constructor = new Contenedor("./Productos.json")

router.get("/:id", (req, res) => {
    try { 
        const {id} = req.params;
        res.send(constructor.getById(id))
        } catch(err) {
          res.status(404).send(err.msg);
        }
})

router.post("/", (req, res) => {
    try { 
    const {nombre, precio, logo, descripcion, codigo, stock} = req.body;
    const Producto = {
        nombre, precio, logo, descripcion, codigo, stock 
    }
    res.send(constructor.save(Producto)+"")
    } catch(err) {
      res.send(err)
    }
  });

  router.put("/:id", (req, res) => {
    try {
      const {id} = req.params;
      const {nombre, precio, logo, descripcion, codigo, stock} = req.body;
      const producto = {nombre, precio, logo, descripcion, codigo, stock}
      res.send(constructor.update(id,producto))
    } catch (err) {
        console.log(err)
    }
  });

  router.delete('/:id', (req,res) => {
    const {id} = req.params;
    res.send(constructor.delete(id))
  });

module.exports = router;