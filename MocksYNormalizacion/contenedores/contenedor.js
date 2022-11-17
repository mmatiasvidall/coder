import mongoose from "mongoose";
import config from "../conf/config.js";

await mongoose.connect(config.mongoDB.uri, config.mongoDB.options);
class Contenedor {
  constructor(coleccion, esquema) {
    this.db = mongoose.model(coleccion, esquema);
  }
  async getAll() {
    try {
      const producto = this.db.find();
      return producto;
    } catch (e) {
      console.log(e);
    }
  }
  async insertProd(obj) {
    try {
      console.log(obj);
      const producto = await this.db.create(obj);
      return producto;
    } catch (e) {
      console.log(e);
    }
  }
}
export default Contenedor;
