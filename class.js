const fs = require("fs");

class Contenedor {
  constructor(archivo) {
    this.file = archivo;
  }
  save(prod) {
    const data = fs.readFileSync(`${this.file}`, "utf-8");
    const productos = JSON.parse(data);
    const id = productos.length + 1;
    prod.id = id;
    const current_datetime = new Date();
    const formatted_date =
      current_datetime.getFullYear() +
      "-" +
      (current_datetime.getMonth() + 1) +
      "-" +
      current_datetime.getDate() +
      " " +
      current_datetime.getHours() +
      ":" +
      current_datetime.getMinutes() +
      ":" +
      current_datetime.getSeconds();
    prod.timestamp = formatted_date;
    productos.push(prod);
    const productosString = JSON.stringify(productos);
    fs.writeFileSync(`${this.file}`, productosString);
  }
  saveCarrito() {
    const data = fs.readFileSync(`${this.file}`, "utf-8");
    const productos = JSON.parse(data);
    const id = productos.length + 1;
    const prod = {};
    prod.productosList = [];
    prod.id = id;
    const current_datetime = new Date();
    const formatted_date =
      current_datetime.getFullYear() +
      "-" +
      (current_datetime.getMonth() + 1) +
      "-" +
      current_datetime.getDate() +
      " " +
      current_datetime.getHours() +
      ":" +
      current_datetime.getMinutes() +
      ":" +
      current_datetime.getSeconds();
    prod.timestamp = formatted_date;
    productos.push(prod);
    const productosString = JSON.stringify(productos);
    fs.writeFileSync(`${this.file}`, productosString);
    return id;
  }
  getById(id) {
    const data = fs.readFileSync(`${this.file}`, "utf-8");
    const productos = JSON.parse(data);
    const index = productos.indexOf(productos[id - 1]);
    return productos[index];
  }
  update(id, prodNew) {
    const data = fs.readFileSync(`${this.file}`, "utf-8");
    const productos = JSON.parse(data);
    const index = productos.indexOf(productos[id - 1]);
    productos.splice(index, 1);
    prodNew.id = id;
    productos.splice(index, 0, prodNew);
    const productosString = JSON.stringify(productos);
    fs.writeFileSync(`${this.file}`, productosString);
  }
  delete(id) {
    const data = fs.readFileSync(`${this.file}`, "utf-8");
    const productos = JSON.parse(data);
    const index = productos.indexOf(productos[id - 1]);
    productos.splice(index, 1);
    const productosString = JSON.stringify(productos);
    fs.writeFileSync(`${this.file}`, productosString);
  }
  pushProdCarrito(id, prod) {
    const data = fs.readFileSync(`${this.file}`, "utf-8");
    const productos = JSON.parse(data);

    const DB = fs.readFileSync("Productos.json", "utf-8");
    const producto = JSON.parse(DB);
    const index1 = producto.indexOf(producto[prod - 1]);
    const productoAdd = producto[index1];

    const index = productos.indexOf(productos[id - 1]);
    const carrito = productos[index];
    carrito.productosList.push(productoAdd);
    productos.splice(index, 1);
    productos.splice(index, 0, carrito);
    const productosString = JSON.stringify(productos);
    fs.writeFileSync(`${this.file}`, productosString);
  }
  deleteById(id, prod) {
    const data = fs.readFileSync(`${this.file}`, "utf-8");
    const productos = JSON.parse(data);
    const index = productos.findindex(carrito => carrito === id);
    console.log(carrito[index]);
    const carrito = productos[index];
    const indexProd = carrito.productosList.indexOf(productos[prod - 1]);
    console.log(indexProd);
    // carrito.productosList.splice(indexProd, 1);

    const productosString = JSON.stringify(productos);
    fs.writeFileSync(`${this.file}`, productosString);
  }
}
module.exports = Contenedor;
