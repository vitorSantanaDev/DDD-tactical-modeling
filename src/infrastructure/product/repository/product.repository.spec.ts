import { Sequelize } from "sequelize-typescript";

import ProductRepository from "./product.repository";
import ProductModel from "./sequilize/product.model";
import Product from "../../../domain/product/entity/product";

describe("Product repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new Product", async () => {
    const productRepository = new ProductRepository();

    const product = new Product("p1", "Product 1", 100);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: "p1" } });

    expect(productModel.toJSON()).toStrictEqual({
      id: "p1",
      name: "Product 1",
      price: 100,
    });
  });

  it("should update a Product", async () => {
    const productRepository = new ProductRepository();

    const product = new Product("p1", "Product 1", 100);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: "p1" } });

    expect(productModel.toJSON()).toStrictEqual({
      id: "p1",
      name: "Product 1",
      price: 100,
    });

    product.changeName("Product 1.1");
    product.changePrice(200);

    await productRepository.update(product);

    const productModel2 = await ProductModel.findOne({ where: { id: "p1" } });

    expect(productModel2.toJSON()).toStrictEqual({
      id: "p1",
      name: "Product 1.1",
      price: 200,
    });
  });

  it("should find a product", async () => {
    const productRepository = new ProductRepository();

    const product = new Product("p1", "Product 1", 100);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: "p1" } });

    const foundProduct = await productRepository.find("p1");

    expect(productModel.toJSON()).toStrictEqual({
      id: foundProduct.id,
      name: foundProduct.name,
      price: foundProduct.price,
    });
  });
  it("should find all products", async () => {
    const productRepository = new ProductRepository();

    const product1 = new Product("p1", "Product 1", 100);
    const product2 = new Product("p2", "Product 2", 200);

    await productRepository.create(product1);
    await productRepository.create(product2);

    const foundProducts = await productRepository.findAll();
    const products = [product1, product2];

    expect(products).toEqual(foundProducts);
  });
});
