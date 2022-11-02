import ContenedorMongo from "../../contenedores/contenedorMongo.js";

class DAOCarritosMongo extends ContenedorMongo {
    constructor() {
        super('carritos', {
            productosList: {type: [], default: []}
        })
    }
}

export default DAOCarritosMongo;