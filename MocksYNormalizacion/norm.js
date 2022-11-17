import DBClass from "./contenedores/contenedorArchivos.js";
const DBM = new DBClass("./DB/msj.json");
import { normalize, denormalize, schema } from "normalizr";
import util from "util";
const print = (obj) => console.log(util.inspect(obj, false, 12, true));

const data = DBM.getAll();

const authorSchema = new schema.Entity("users", {}, { idAttribute: "id" });

const postSchema = new schema.Entity("post", {
  author: authorSchema,
});

const mensa = new schema.Entity("no", {
  mensajes: postSchema,
});

const postNor = normalize(data, mensa);
print(postNor);
