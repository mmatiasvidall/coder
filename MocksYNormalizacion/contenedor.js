import knex from "knex";

class Contenedor {
  constructor(config, table) {
    this.knex = knex(config);
    this.table = table;
  }
  async getAll() {
    try {
      return this.knex.select("*").from(this.table);
    } catch (e) {
      console.log(e);
    }
  }
  async insertProd(prod) {
    try {
      return this.knex.insert(prod).into(this.table);
    } catch (e) {
      console.log(e);
    }
  }
}
export default Contenedor;
