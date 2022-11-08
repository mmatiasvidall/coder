import daos from "./src/daos/index.js";

async () => {
  const { productosDAO, carritosDAO } = await daos();
};
