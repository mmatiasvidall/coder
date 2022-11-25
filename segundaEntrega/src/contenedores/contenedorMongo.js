import mongoose from "mongoose";
import config from "../config.js";

await mongoose.connect(config.mongoDB.uri, config.mongoDB.options);
class ContenedorMongo {
  constructor(coleccion, esquema) {
    this.db = mongoose.model(coleccion, esquema);
  }
  async getAll() {
    try {
      const producto = this.productos.find();
      return producto;
    } catch (e) {
      console.log(e);
    }
  }
  async save(prod) {
    try {
      prod.timestamp = Date.now();
      const producto = await this.db.create(prod);
      return producto;
    } catch (e) {
      console.log(e);
    }
  }
  async saveCarrito(prod) {
    const carrito = await this.db.create(prod);
    return carrito;
  }
  async getById(id) {
    try {
      const producto = await this.db.findOne({ _id: id });
      return producto;
    } catch (e) {
      console.log(e);
    }
  }
  async update(prod) {
    try {
      await this.db.replaceOne({ _id: prod._id }, prod);
      return prod;
    } catch (e) {
      console.log(e);
    }
  }
  async delete(id) {
    try {
      await this.db.deleteOne({ _id: id });
    } catch (e) {
      console.log(e);
    }
  }
  async pushProdCarrito(id, obj) {
    try {
      const agregar = this.db.updateOne(
        { _id: id },
        { $push: { productosList: obj } }
      );
      return agregar;
    } catch (e) {
      console.log(e);
    }
  }
  async deleteById(idEntered, idProd) {
    try {
      const kick = await this.db.updateOne(
        { _id: idEntered },
        { $pull: { productosList: { _id: mongoose.Types.ObjectId(idProd) } } }
      );
      return kick;
    } catch (e) {
      console.log(e);
    }
  }
}

export default ContenedorMongo;
