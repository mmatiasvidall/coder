import admin from "firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
import FirebaseDetails from "../../DB/firebase.js";

admin.initializeApp({
  credential: admin.credential.cert(FirebaseDetails),
  databaseURL: "https://ecommerce-46191.firebaseio.com",
});

const db = admin.firestore();

class ContenedorFire {
  constructor(coleccion) {
    this.db = db;
    this.coll = db.collection(coleccion);
    this.collprod = db.collection("productos");
  }

  async getAll() {
    try {
      const result = await this.coll.get();
      const docs = result.docs;
      const productos = docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      console.log(productos);
    } catch (e) {
      console.log(e);
    }
  }

  async save(prod) {
    try {
      const producto = await this.coll.add(prod);
      return producto;
    } catch (e) {
      console.log(e);
    }
  }

  async saveCarrito() {
    try {
      const carrito = await this.coll.add({ prodList: [] });
      return carrito;
    } catch (e) {
      console.log(e);
    }
  }

  async getById(id) {
    try {
      const doc = this.coll.doc(`${id}`);
      const item = await doc.get();
      const response = item.data();
      return response;
    } catch (e) {
      console.log(e);
    }
  }

  async update(prod) {
    try {
      const id = prod.id;
      const doc = this.coll.doc(`${id}`);
      const item = await doc.update(prod);
      console.log(item);
    } catch (e) {
      console.log(e);
    }
  }

  async delete(id) {
    try {
      const doc = this.coll.doc(`${id}`);
      const item = await doc.delete();
      console.log(item);
    } catch (e) {
      console.log(e);
    }
  }

  async pushProdCarrito(idEntered, idProd) {
    try {
      const doc = this.collprod.doc(`${idProd}`);
      const item = await doc.get();
      const response = item.data();
      console.log(response);

      const carritoRef = this.coll.doc(idEntered);
      await carritoRef.update({
        prodList: FieldValue.arrayUnion(response),
      });
    } catch (e) {
      console.log(e);
    }
  }

  async deleteById(idEntered, idProd) {
    try {
      const carritoRef = this.coll.doc(idEntered);
      await carritoRef.update({
        prodList: FieldValue.arrayRemove(idProd),
      });
    } catch (e) {
      console.log(e);
    }
  }
}

export default ContenedorFire;
