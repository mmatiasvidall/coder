import daos from "./src/daos/index.js";

(async () => {
  const { productosDAO, carritosDAO } = await daos();
  await productosDAO.save({
    nombre: "Championes",
    precio: 1499.99,
    logo: "https://imgs.search.brave.com/nTXBbiwPrC-Zf9fjrfTFMbWOBfB-zkLb4uXRM_Ws4CI/rs:fit:1200:1200:1/g:ce/aHR0cDovL3BsdXNw/bmcuY29tL2ltZy1w/bmcvZGFuY2Utc2hv/ZXMtcG5nLWhkLXNu/ZWFrZXItcG5nLXRy/YW5zcGFyZW50LWlt/YWdlLTI1MDAucG5n",
    descripcion:
      "Las zapatillas fabricadas con suela de goma tienen mayor resistencia al desgaste, son naturalmente impermeables y flexibles, y además extienden la estabilidad de la contracción.",
    codigo: 583759,
    stock: 8,
  });
})();
