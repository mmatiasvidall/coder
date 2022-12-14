import ContenedorMongo from "../../contenedores/contenedorMongo.js";

class DAOProductosMongo extends ContenedorMongo {
  constructor() {
    super("productos", {
      nombre: String,
      precio: Number,
      logo: String,
      descripcion: String,
      codigo: Number,
      stock: Number,
    });
  }
}

export default DAOProductosMongo;
