import admin from 'firebase-admin';
import FirebaseDetails from '../../DB/firebase.js'

admin.initializeApp({
  credential: admin.credential.cert(FirebaseDetails),
  databaseURL: "https://ecommerce-46191.firebaseio.com"
});

console.log("conectado");

const db = admin.firestore()



class ContenedorFire {
  constructor(coleccion) {
    this.db = db
    this.coll = db.collection(coleccion)
  }
  async save(prod) {
    try {

    } catch (e) {
      console.log(e);
    }
  }
  async saveCarrito(prod) {
    try {

    } catch (e) {
      console.log(e);
    }
    }
  async getById(id) {
    try {

    } catch (e) {
      console.log(e);
    }
  }
  async update(prod) {
    try {

    } catch(e) {
      console.log(e);
    }
  }
  async delete(id) {
    try{

    } catch (e) {
      console.log(e);
    }
  }
  async pushProdCarrito(idEntered, idProd){
    try {

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