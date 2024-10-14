import Customer from "../../customer/entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/orderItem";

export default class OrderService {
  static placeOrder(customer: Customer, items: OrderItem[]): Order {
    if (items.length === 0) {
      throw new Error("Order must have at least one item");
    }
    const order = new Order(Math.random().toString(), customer.id, items);
    customer.addRewardPoint(order.total() / 2);
    return order;
  }
  static total(orders: Order[]): number {
    return orders.reduce((sum, order) => (sum += order.total()), 0);
  }
}
