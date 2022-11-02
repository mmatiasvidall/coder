import ContenedorMongo from "../../contenedores/contenedorMongo.js";
(async () => { 
const producto = new ContenedorMongo('productos', {
    nombre: String,
    precio: Number,
    logo: String,
    descripcion: String,
    codigo: Number,
    stock: Number,
})
await producto.save({})
await producto.getById("id")

})();