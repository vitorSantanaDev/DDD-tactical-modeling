import Product from "../entity/product";
import ProductB from "../entity/product-b";
import ProductInterface from "../entity/product.interface";
import { v4 as uuid } from "uuid";

export default class ProductFactory {
  public static create({
    name,
    price,
    type,
  }: {
    name: string;
    price: number;
    type: string;
  }): ProductInterface {
    switch (type) {
      case "A": {
        return new Product(uuid(), name, price);
      }
      case "B": {
        return new ProductB(uuid(), name, price);
      }
      default: {
        throw new Error("Invalid type passed to ProductFactory constructor");
      }
    }
  }
}
