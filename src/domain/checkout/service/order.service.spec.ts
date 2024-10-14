import Customer from "../../customer/entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/orderItem";
import OrderService from "./order.service";

describe("Order service unit tests", () => {
  it("should place an order", () => {
    const customer = new Customer("c1", "Vitor");
    const item1 = new OrderItem("i1", "item 1", 100, "p1", 10);

    const order = OrderService.placeOrder(customer, [item1]);

    expect(customer.rewardPoints).toEqual(500);
    expect(order.total()).toEqual(1000);
  });
  it("should get total of all orders", () => {
    const item1 = new OrderItem("1", "item 1", 100, "p1", 10);
    const item2 = new OrderItem("2", "item 2", 200, "p2", 10);
    const item3 = new OrderItem("3", "item 3", 300, "p3", 10);

    const order1 = new Order("1", "c1", [item1]);
    const order2 = new Order("2", "c2", [item2]);
    const order3 = new Order("2", "c2", [item3]);

    const total = OrderService.total([order1, order2, order3]);

    expect(total).toBe(6000);
  });
});
