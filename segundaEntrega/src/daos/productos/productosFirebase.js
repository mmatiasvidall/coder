import ContenedorMongo from "../../contenedores/contenedorFirebase.js";

class DAOProductosFire extends ContenedorMongo {
    constructor() {
        super('productos')
    }
}

export default DAOProductosFire;