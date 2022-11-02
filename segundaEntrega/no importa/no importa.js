import express from 'express'
const {Router} = express;
const router  = Router();
import Contenedor from "../../contenedores/contenedorArchivo.js";
const constructor = new Contenedor("../../../DB/Productos.json")

const isAdmin = true;
const protegida = (req,res,next) => {
  if(isAdmin) {
    next()
  } else {
    res.send(403, "Acceso denegado")
  }
}

router.get("/:id", (req, res) => {
    try { 
        const {id} = req.params;
        res.send(constructor.getById(id))
        } catch(err) {
          res.status(404).send(err.msg);
        }
})

router.post("/",protegida, (req, res) => {
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

  router.put("/:id",protegida, (req, res) => {
    try {
      const {id} = req.params;
      const {nombre, precio, logo, descripcion, codigo, stock} = req.body;
      const producto = {nombre, precio, logo, descripcion, codigo, stock}
      res.send(constructor.update(id,producto))
    } catch (err) {
        console.log(err)
    }
  });

  router.delete('/:id',protegida, (req,res) => {
    const {id} = req.params;
    res.send(constructor.delete(id))
  });

module.exports = router;