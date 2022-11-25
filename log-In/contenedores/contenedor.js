import mongoose from "mongoose";
import config from "../config/config.js";
import randomProd from "./faker.js";

await mongoose.connect(config.mongoDB.uri, config.mongoDB.options);
class ContenedorMongo {
  constructor(coleccion, esquema) {
    this.db = mongoose.model(coleccion, esquema);
  }
  async getAll() {
    try {
      const producto = await this.db.find({});
      return producto;
    } catch (e) {
      console.log(e);
    }
  }
  async save(prod) {
    try {
      const producto = await this.db.create(prod);
      return producto;
    } catch (e) {
      console.log(e);
    }
  }
  faker() {
    const lista = [];
    for (let i = 0; i < 5; i++) {
      lista.push(randomProd());
    }
    return lista;
  }
}

export default ContenedorMongo;
