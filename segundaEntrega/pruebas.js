// import DAOProductosMongo from "./src/daos/productos/productosMongo.js";
// import DAOCarritosMongo from "./src/daos/carritos/carritoMongo.js";

// (async () => {
//     const productoMongo = new DAOCarritosMongo();
//     console.log(await productoMongo.deleteById("636189beea024bfebb18ac22", "6361600fb7869ecb9188925b"))

//     // console.log(productoMongo.pushProdCarrito("636189beea024bfebb18ac22", "6361600fb7869ecb9188925b"));
// })();

import admin from "firebase-admin";
import FirebaseDetails from "./DB/firebase.js";
import DAOproductosFire from "./src/daos/productos/productosFirebase.js";
import DAOcarritosFire from "./src/daos/carritos/carritoFirebase.js";

(async () => {
  const productoFire = new DAOproductosFire();
  const carritosFire = new DAOcarritosFire();

  // productoFire.save({nombre: "Pantalon", precio: 777.99,
  // logo: "https://imgs.search.brave.com/07CrYIGK26bELsUWKiv8yHVe1_AiAfqXuaa9pXARyxw/rs:fit:875:1200:1/g:ce/aHR0cDovL3BsdXNw/bmcuY29tL2ltZy1w/bmcvYmx1ZS1qZWFu/cy1wbmctaGQtZGFt/YWdlLWplYW5zLTg3/NS5wbmc",
  // descripcion: "Pantalón Cargo Hombre de Gabardina Elastizada, Jogger Con Bolsillos al Costado - Excelente calce y confección.",
  // codigo: 232323,
  // stock: 12})

  // carritosFire.saveCarrito();
  // productoFire.delete("bCGFpAOhJZ8nqwUwG0mc")
  // productoFire.getById("o9nhPLmUqzRIwJaPsusa");

  carritosFire.pushProdCarrito("QjihNnDCGB20BgHCOJ7x", "o9nhPLmUqzRIwJaPsusa");
  // carritosFire.deleteById("QjihNnDCGB20BgHCOJ7x" , "o9nhPLmUqzRIwJaPsu1223")
  // carritosFire.saveCarrito();
})();

// // id: "rwxhriCaQ7iyFEuLNVfs"
