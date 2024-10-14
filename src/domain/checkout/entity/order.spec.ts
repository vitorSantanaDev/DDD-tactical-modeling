import Order from "./order";
import OrderItem from "./orderItem";

describe("Order unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      const order = new Order("", "123", []);
    }).toThrow("Id is required");
  });
  it("should throw error when customerId is empty", () => {
    expect(() => {
      const order = new Order("1", "", []);
    }).toThrow("customerId is required");
  });
  it("should throw error when items is empty", () => {
    expect(() => {
      const order = new Order("1", "123", []);
    }).toThrow("Items quantity must be greater than 0");
  });
  it("should calculate total", () => {
    const item = new OrderItem("1", "Livro", 100, "p1", 2);
    const item2 = new OrderItem("2", "Livro 2", 200, "p2", 3);
    const order = new Order("1", "123", [item, item2]);
    const total = order.total();
    expect(total).toBe(800);
  });
  it("should throw error if the item quantity is greater than 0", () => {
    expect(() => {
      const item = new OrderItem("1", "Livro", 100, "p1", 0);
      const order = new Order("1", "123", [item]);
    }).toThrow("Items quantity must be greater than 0");
  });
});
