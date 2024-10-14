import ProductFactory from "./product.factory";

describe("Product factory unit test", () => {
  it("should create a product type A", () => {
    const product = ProductFactory.create({
      name: "Product A",
      price: 100,
      type: "A",
    });

    expect(product.id).toBeDefined();
    expect(product.name).toBe("Product A");
    expect(product.price).toBe(100);
    expect(product.constructor.name).toBe("Product");
  });

  it("should create a product type B", () => {
    const product = ProductFactory.create({
      name: "Product B",
      price: 200,
      type: "B",
    });

    expect(product.id).toBeDefined();
    expect(product.name).toBe("Product B");
    expect(product.price).toBe(400);
    expect(product.constructor.name).toBe("ProductB");
  });

  it("should throw a when try to create a product with type C", () => {
    expect(() => {
      const product = ProductFactory.create({
        name: "Product C",
        price: 200,
        type: "C",
      });
    }).toThrow("Invalid type passed to ProductFactory constructo");
  });
});
