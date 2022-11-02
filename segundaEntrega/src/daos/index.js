import * as dotenv from 'dotenv';
dotenv.config();
process.env.TIPO;

export default {
    mongo: async () => {
        const {default: DAOProductosMongo} = await import("./productos/productosMongo.js");
        const {default: DAOCarritosMongo} = await import("./carritos/carritoMongo.js")
        return {
            productosDAO: new DAOProductosMongo,
            carritosDAO: new DAOCarritosMongo,
        };
    },
    archivo: () => {


    }
};