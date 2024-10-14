import Product from "./product";

describe("Product unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      const product = new Product("", "Product 1", 100);
    }).toThrow("Id cannot be empty");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      const product = new Product("1", "", 100);
    }).toThrow("Name cannot be empty");
  });
  it("should throw error when price is less or equal than 0", () => {
    expect(() => {
      const product = new Product("1", "Product 1", 0);
    }).toThrow("Price must be greater than zero");
  });
  it("should change name corretly", () => {
    const product = new Product("1", "Product 1", 100);
    product.changeName("Product 1.1");
    expect(product.name).toEqual("Product 1.1");
  });
  it("should change price corretly", () => {
    const product = new Product("1", "Product 1", 100);
    product.changePrice(150);
    expect(product.price).toEqual(150);
  });
});
