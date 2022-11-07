import ContenedorMongo from "../../contenedores/contenedorFirebase.js";

class DAOCarritosFire extends ContenedorMongo {
    constructor() {
        super('carritos')
    }
}

export default DAOCarritosFire;