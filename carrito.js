const express = require('express')
const {Router} = express;
const router  = Router();
const Contenedor = require("./class");
const constructor = new Contenedor("./carrito.json")

router.post("/", (req, res) => {
  try {    
    res.send(constructor.saveCarrito()+"")
  } catch(err) {
    res.send(err)
  }
});
router.post("/:id/:prod", (req, res) => {
  try {
    const {id,prod} = req.params  
    res.send(constructor.pushProdCarrito(id,prod))
  } catch(err) {
    res.send(err)
  }
});
router.delete("/:id", (req,res) =>{
  const {id} = req.params;
  res.send(constructor.delete(id)) 
});
router.delete("/:id/productos/:prod", (req,res) => {
  try {
    const {id,prod} = req.params;
    res.send(constructor.deleteById(id,prod));
  } catch(err) {
    res.send(err)
  }
})
router.get("/:id/productos", (req,res) => {
  const {id}= req.params
  res.send(constructor.getById(id))
});



module.exports = router;