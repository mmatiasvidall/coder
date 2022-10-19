import knex from "knex";
import connection from "./dbConf.js";
const Knex = knex(connection);

Knex.schema
  .createTable("productos", (table) => {
    table.string("nombre");
    table.string("precio");
    table.string("logo");
  })
  .then(() => console.log("tabla creada"))
  .catch((err) => {
    console.log("error", err);
    throw err;
  })
  .finally(() => {
    Knex.destroy();
  });