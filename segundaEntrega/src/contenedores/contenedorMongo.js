import mongoose from "mongoose";
import { arch } from "os";
import config from "../config.js";

await mongoose.connect(config.mongoDB.uri, config.mongoDB.options)
class ContenedorMongo {
  constructor(coleccion, esquema) {
    this.db = mongoose.model(coleccion, esquema);
    this.productos = mongoose.model("productos", {
      nombre: String,
      precio: Number,
      logo: String,
      descripcion: String,      // ESTA MAL SI, PERO TAMBIEN FUNCIONA 
      codigo: Number,
      stock: Number,
  })
  }
  async getAll() {
    try{ 
      const producto = this.productos.find();
      return producto;
    }catch(e){
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
  async saveCarrito(prod) {
    const carrito = await this.db.create(prod);
    return carrito;
    }
  async getById(id) {
    try {
      const producto = await this.db.findOne({_id: id});
      return producto;
    } catch (e) {
      console.log(e);
    }
  }
  async update(prod) {
    try {
      await this.db.replaceOne({_id: prod._id}, prod);
      return prod;
    } catch(e) {
      console.log(e);
    }
  }
  async delete(id) {
    try{
      await this.db.deleteOne({_id: id})
    } catch (e) {
      console.log(e);
    }
  }
  async pushProdCarrito(id, idProd){
    try {
      const producto = await this.productos.findOne({_id: idProd})
      const agregar = this.db.updateOne(
        { _id: id },
        { }
     )
     return agregar;  
    } catch(e) {
      console.log(e);
    }
  }
  deleteById(idEntered, idProd){
    try{

    } catch(e){
      console.log(e);
    }
  }
}

export default ContenedorMongo;