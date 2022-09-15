const express= require('express');
const fs = require('fs');
const handlebars = require('express-handlebars');
const pug = require('pug')
const ejs = require('ejs')

const app = express();

/////////////////////////////////////////
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//////////Handlebars////////////////////
const hbs = handlebars.engine({
    extname: "hbs",
    layoutsDir: "./views/layouts/",
});

//////////Views Engine/////////////////
app.engine("hbs", hbs)
app.set("views", "./views");
app.set("view engine", "hbs");
// app.set("view engine", "pug");
// app.set("view engine", "ejs");

//////////Funciones//////////////////
app.get('/registro', (req,res) => {
    res.render("main", {layout: "registro"});
});

app.get("/productos", (req,res) => {
    const data = fs.readFileSync("./productos.json" , "utf-8")
    const productos = JSON.parse(data)
    if (productos.length>0){
        res.render("main", {layout:"tabla", productos: productos})
    } else{
        res.render("main", {layout:"err"})
    }
});

app.post("/productos", (req,res) => {
    try {
    const data = fs.readFileSync("./productos.json", "utf-8")
    const producto = JSON.parse(data);
    const {nombre, precio, logo} = req.body;
    const productoNuevo = ({nombre, precio, logo});
    producto.push(productoNuevo);
    const productosString = JSON.stringify(producto);
    fs.writeFileSync("./productos.json", productosString);
    return res.redirect("/registro")
    } catch (err){
        res.send(err.msg)
    }
});

//////////////Starting/////////////////
app.listen(8080, (req,res) => {
    console.log('Iniciando')
})