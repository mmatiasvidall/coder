import fs from "fs";

class Contenedor {
  constructor(archivo) {
    this.file = archivo;
  }
  save(prod) {
    try {
    const data = fs.readFileSync(`${this.file}`, "utf-8");
    const dataParsed = JSON.parse(data);
    const id = dataParsed.length + 1;
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
    dataParsed.push(prod);
    const productosString = JSON.stringify(dataParsed);
    fs.writeFileSync(`${this.file}`, productosString);
    return productosString;
    } catch(err) {
      console.log(err.msg);
    }
  }
  saveCarrito() {
    try { 
    const data = fs.readFileSync(`${this.file}`, "utf-8");
    const dataParsed = JSON.parse(data);
    const id = dataParsed.length + 1;
    const carrito = {};
    carrito.productosList = [];
    carrito.id = id;
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
    carrito.timestamp = formatted_date;
    dataParsed.push(carrito);
    const productosString = JSON.stringify(dataParsed);
    fs.writeFileSync(`${this.file}`, productosString);
    return id;
    } catch(err) {
      console.log(err.msg);
    }
  }
  getAll() {
    try {
      const data = fs.readFileSync(`${this.file}`, "utf-8");
      const dataParsed = JSON.parse(data);
      return dataParsed;
    }catch (e) {
      console.log(err.msg);
    }
  }
  getById(idEntered) {
    try {
      const data = fs.readFileSync(`${this.file}`, "utf-8");
      const dataParsed = JSON.parse(data);
      const productFind = dataParsed.find(({ id }) => id == idEntered);
      if (productFind) {
        return productFind;
      } else {
        console.log("No se encontro el producto");
      }
    } catch (error) {
      console.error(err.msg);
    }
  }
  update(idEntered, prodNew) {
    try {
    const data = fs.readFileSync(`${this.file}`, "utf-8");
    const dataParsed = JSON.parse(data);
    const idFilter = dataParsed.filter(({id}) => id != idEntered)
    const productFind = dataParsed.find(({id}) => id == idEntered);
    if(productFind){
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
      const productNew = { ...prodNew, id: idEntered, timestamp:formatted_date };
      idFilter.push(productNew); 
      const updateString = JSON.stringify(idFilter, null, " ");
      fs.writeFileSync(`${this.file}`, updateString);
      return productNew;
    } else {
      console.log(`El producto con la id ${idEntered} no existe`);
    } 
  }catch (err) {
    console.error(err.msg)
  }
  }
  delete(idEntered) {
    const data = fs.readFileSync(`${this.file}`, "utf-8");
    const dataParsed = JSON.parse(data);
    const idFilter = dataParsed.filter(({id}) => id != idEntered)
    const productFind = dataParsed.find(({id}) => id == idEntered);
    if (productFind) {
      const updatedString = JSON.stringify(idFilter, null, " ");
      fs.promises.writeFile(`${this.file}`, updatedString);
      return updatedString;
    } else {
      console.log(`No se ha encontrado el objeto con id: ${idEntered}`);
    }
  } catch (err) {
    console.error(err.msg);
  }
  pushProdCarrito(idEntered, idProd){
    try {
    const data = fs.readFileSync(`${this.file}`,"utf-8");
    const dataParsed = JSON.parse(data);
    const dataprod = fs.readFileSync("Productos.json","utf-8")
    const dataParsedProd = JSON.parse(dataprod);
    const productFind = dataParsedProd.find(({id}) => id == idProd);
    const carritoFilter = dataParsed.filter(({id}) => id != idEntered)    
    const carritoFind = dataParsed.find(({id}) => id == idEntered);
    if(carritoFind){
      if(productFind) {
        carritoFind.productosList.push(productFind);
        carritoFilter.push(carritoFind);
        const update = JSON.stringify(carritoFilter, null, " ");
        fs.writeFileSync(`${this.file}`, update)
        return update
      } else {
        console.log("No se encontro el producto");
      }
    } else {
      console.log("No se encontro el carrito");
    }
  } catch(err) {
      console.log(err.msg);
  }
  }
  deleteById(idEntered, idProd){
    try {
    const data = fs.readFileSync(`${this.file}`,"utf-8");
    const dataParsed = JSON.parse(data);
    const carritoFilter = dataParsed.filter(({id}) => id != idEntered);    
    const carritoFind = dataParsed.find(({id}) => id == idEntered);
    const carritoProdFilter = carritoFind.productosList.filter(({id}) => id != idProd);
    const carritoProdFind = carritoFind.productosList.find(({id}) => id == idProd);
      if(carritoFind) {
        if(carritoProdFind){
          carritoFind.productosList = carritoProdFilter;
          carritoFilter.push(carritoFind);
          const update = JSON.stringify(carritoFilter, null, " ");
          fs.writeFileSync(`${this.file}`, update); 
          return update;
        } else {
          console.log("No se encontro el producto");
        }
      } else {
        console.log("No se encontro el carrito")
      }
    } catch(err) {
      console.log(err.msg);
    }
  }
}

export default Contenedor
