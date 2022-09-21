const express = require('express');
const fs = require('fs')
const {Router} = express;
const router = Router();

router.post('/post', (req,res) => {
    try {
    const data = fs.readFileSync('./productos.json', 'utf-8');
    const productos = JSON.parse(data);
    const {nombre,precio,logo} = req.body;
    const productosNuevo = ({nombre,precio,logo});
    productos.push(productosNuevo);
    const productosString = JSON.stringify(productos);
    fs.promises.writeFile('./productos.json', productosString);
    return res.redirect('/')
    } catch (err) {
        console.log(err)
    }
})

///// IMPORTANTE PARA QUE FUNCIONE ROUTER
module.exports = router