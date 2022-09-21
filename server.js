const express= require('express');
const { Server: HTTPServer} = require('http')
const { Server: SocketServer} = require('socket.io')
const fs = require('fs');
const handlebars = require('express-handlebars');
const productosRouter = require('./productos');
const app = express();
const httpserver = new HTTPServer(app)
const io = new SocketServer(httpserver)

/////////////////////////////////////////
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api', productosRouter);
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
    res.render("main", {layout: "principal", productos: productos});
});

///////////Socket/////////////////////
const mensajes = []
io.on('connection', function(socket) {
    console.log('usuario conectado');
    socket.emit('mensajes', mensajes);

    socket.on('new_msg', (data) => {
        mensajes.push(data);

        io.sockets.emit("mensajes", mensajes)
    });
});

//////////////Starting/////////////////
httpserver.listen(8080, (req,res) => {
    console.log('Iniciando')
})