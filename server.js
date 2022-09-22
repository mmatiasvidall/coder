const express= require('express');
const { Server: HTTPServer} = require('http')
const { Server: SocketServer} = require('socket.io')
const fs = require('fs');
const handlebars = require('express-handlebars');
const app = express();
const httpserver = new HTTPServer(app)
const io = new SocketServer(httpserver)

/////////////////////////////////////////
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("views"));
//////////Handlebars////////////////////
const hbs = handlebars.engine({
    extname: "hbs",
    layoutsDir: "./views",
});

//////////Views Engine/////////////////
app.engine("hbs", hbs)
app.set("views", "./views");
app.set("view engine", "hbs");

//////////Funciones//////////////////
app.get('/', (req,res) => {
    const data = fs.readFileSync('./productos.json', 'utf-8')
    const productos = JSON.parse(data);
    res.render("main", {layout: "principal"});
});

///////////Socket/////////////////////
io.on('connection', function(socket) {
    const DataMensajes= fs.readFileSync("./mensajes.json", "utf-8");
    const mensajes = JSON.parse(DataMensajes);
    const DataProductos = fs.readFileSync("./productos.json", "utf-8");
    const productos = JSON.parse(DataProductos);
    console.log('usuario conectado');
    socket.emit('mensajes', mensajes);
    socket.emit('productos', productos);

    socket.on('new_msg', (data) => {
        mensajes.push(data);
        const mensajesString = JSON.stringify(mensajes);
        fs.writeFileSync('./mensajes.json',mensajesString);
        io.sockets.emit("mensajes", mensajesString)
    });
    socket.on('new_producto', (prod) => {
        productos.push(prod);
        const productosString = JSON.stringify(productos);
        fs.writeFileSync('./productos.json',productosString);
        io.sockets.emit("productos", productosString)
    });
});

//////////////Starting/////////////////
httpserver.listen(8080, (req,res) => {
    console.log('Iniciando')
})