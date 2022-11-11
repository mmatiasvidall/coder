import { faker } from "@faker-js/faker";
faker.locale = "es_MX";

const { commerce, image } = faker;

const productos = () => {
  return {
    nombre: commerce.product(),
    precio: commerce.price(1, 7000, 1, "$"),
    logo: image.fashion(50, 50, true),
  };
};
export default productos;
