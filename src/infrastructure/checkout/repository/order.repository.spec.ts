import { Sequelize } from "sequelize-typescript";

import OrderRepository from "./order.repository";
import CustomerModel from "../../customer/repository/sequilize/customer.model";
import OrderModel from "./sequilize/order.model";
import OrderItemModel from "./sequilize/order-item.model";
import ProductModel from "../../product/repository/sequilize/product.model";
import CustomerRepository from "../../customer/repository/customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import ProductRepository from "../../product/repository/product.repository";
import Product from "../../../domain/product/entity/product";
import OrderItem from "../../../domain/checkout/entity/orderItem";
import Order from "../../../domain/checkout/entity/order";

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("123", "123", [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: "123",
          product_id: "123",
        },
      ],
    });
  });

  it("should find a order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("123", "123", [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const foundedOrder = await orderRepository.find(order.id);

    expect(foundedOrder).toStrictEqual(order);
  });

  it("should update a order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);

    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );
    const order = new Order("123", "123", [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const product2 = new Product("222", "Product 2", 100);
    await productRepository.create(product2);

    const orderItem2 = new OrderItem(
      "2",
      product2.name,
      product2.price,
      product2.id,
      2
    );

    order.changeItems([orderItem, orderItem2]);

    await orderRepository.update(order, sequelize);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: [{ model: OrderItemModel }],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: 220,
      items: [
        {
          id: "1",
          product_id: "123",
          order_id: "123",
          quantity: 2,
          name: "Product 1",
          price: 10,
        },
        {
          id: "2",
          product_id: "222",
          order_id: "123",
          quantity: 2,
          name: "Product 2",
          price: 100,
        },
      ],
    });
  });

  it("should find all orders", async () => {
    const customerRepository = new CustomerRepository();
    const customer1 = new Customer("123", "Customer 1");
    const address1 = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer1.Address = address1;
    customer1.addRewardPoint(10);
    customer1.activate();

    const customer2 = new Customer("456", "Customer 2");
    const address2 = new Address("Street 2", 2, "Zipcode 2", "City 2");
    customer2.Address = address2;
    customer2.addRewardPoint(20);

    await customerRepository.create(customer1);
    await customerRepository.create(customer2);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    const product2 = new Product("222", "Product 2", 100);

    await productRepository.create(product);
    await productRepository.create(product2);

    const orderRepository = new OrderRepository();

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );
    const order = new Order("1", customer1.id, [orderItem]);

    const orderItem2 = new OrderItem(
      "2",
      product2.name,
      product2.price,
      product2.id,
      2
    );
    const order2 = new Order("2", customer2.id, [orderItem2]);

    await orderRepository.create(order);
    await orderRepository.create(order2);

    const orders = await orderRepository.findAll();

    expect(orders).toHaveLength(2);
    expect(orders).toContainEqual(order);
    expect(orders).toContainEqual(order2);
  });
});
