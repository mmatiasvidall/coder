import fs from "fs";

class contenedor {
  constructor(archivo) {
    this.file = archivo;
  }
  getAll() {
    try {
      const data = fs.readFileSync(`${this.file}`, "utf-8");
      const dataParsed = JSON.parse(data);
      return dataParsed;
    } catch (e) {
      console.log(e);
    }
  }
  save(msj) {
    try {
      const data = fs.readFileSync(`${this.file}`, "utf-8");
      const dataParsed = JSON.parse(data);
      dataParsed.push(msj);
      const productosString = JSON.stringify(dataParsed);
      fs.writeFileSync(`${this.file}`, productosString);
    } catch (e) {
      console.log(e);
    }
  }
}
export default contenedor;
