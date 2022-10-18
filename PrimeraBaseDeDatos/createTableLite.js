import knex from "knex";
import connectionLite from "./dbConfigLite.js";
const Knex = knex(connectionLite);

Knex.schema.createTable("mensajes", (table) => {
    table.string("nombre");
    table.string("msj");
    table.string("date");
  })
  .then(() => console.log("tabla creada"))
  .catch((err) => {
    console.log("error", err);
    throw err;
  })
  .finally(() => {
    Knex.destroy();
  });