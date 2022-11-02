import DAOProductosMongo from "./src/daos/productos/productosMongo.js";
import DAOCarritosMongo from "./src/daos/carritos/carritoMongo.js";

(async () => {
    const productoMongo = new DAOCarritosMongo();
    console.log(await productoMongo.pushProdCarrito("636189beea024bfebb18ac22", "6361600fb7869ecb9188925b"))
})();