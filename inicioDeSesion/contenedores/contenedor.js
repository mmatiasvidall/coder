import mongoose from "mongoose";
import config from "../config/config.js";
import randomProd from "./faker.js";

await mongoose.connect(config.mongoDB.uri, config.mongoDB.options);
class ContenedorMongo {
  constructor(coleccion, esquema) {
    this.db = mongoose.model(coleccion, esquema);
  }
  async find(data) {
    const user = this.db.find(data);
    return user;
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
  async faker() {
    const lista = [];
    for (let i = 0; i < 5; i++) {
      lista.push(randomProd());
    }
    return lista;
  }
  async findOne(user) {
    try {
      const user1 = await this.db.findOne({
        username: user.username,
        password: user.password,
      });
      return user1;
    } catch (e) {
      console.log(e);
    }
  }
  async findByid(id) {
    try {
      const user = await this.db.findById(id);
      return user;
    } catch (e) {
      console.log(e);
    }
  }
}

export default ContenedorMongo;
