import * as dotenv from "dotenv";
dotenv.config();
process.env.TIPO;

const daos = {
  mongo: async () => {
    const { default: DAOProductosMongo } = await import(
      "./productos/productosMongo.js"
    );
    const { default: DAOCarritosMongo } = await import(
      "./carritos/carritoMongo.js"
    );
    return {
      productosDAO: new DAOProductosMongo(),
      carritosDAO: new DAOCarritosMongo(),
    };
  },
  archivo: async () => {
    const { default: DAOProductosArchivo } = await import(
      "./productos/productosArchivo.js"
    );
    const { default: DAOCarritosArchivo } = await import(
      "./carritos/carritoArchivo.js"
    );
    return {
      productosDAO: new DAOProductosArchivo(),
      carritosDao: new DAOCarritosArchivo(),
    };
  },
  firebase: async () => {
    const { default: DAOProductosFire } = await import(
      "./productos/productosFirebase.js"
    );
    const { default: DAOCarritosFire } = await import(
      "./carritos/carritoFirebase.js"
    );
    return {
      productosDAO: new DAOProductosFire(),
      carritosDAO: new DAOCarritosFire(),
    };
  },
};

export default daos[process.env.TIPO];
