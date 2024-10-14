import { Sequelize } from "sequelize";
import Order from "../../../domain/checkout/entity/order";
import OrderRepositoryInterface from "../../../domain/checkout/repository/order-repository.interface";
import OrderModel from "./sequilize/order.model";
import OrderItemModel from "./sequilize/order-item.model";
import OrderItem from "../../../domain/checkout/entity/orderItem";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async find(id: string): Promise<Order> {
    const foundedOrder = await OrderModel.findOne({
      where: { id: id },
      include: [{ model: OrderItemModel }],
    });

    const order = new Order(
      foundedOrder.id,
      foundedOrder.customer_id,
      foundedOrder.items.map(
        (item) =>
          new OrderItem(
            item.id,
            item.name,
            item.price,
            item.product_id,
            item.quantity
          )
      )
    );

    return order;
  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({
      include: [{ model: OrderItemModel }],
    });

    const orders = orderModels.map((orderModel) => {
      let order = new Order(
        orderModel.id,
        orderModel.customer_id,
        orderModel.items.map(
          (item) =>
            new OrderItem(
              item.id,
              item.name,
              item.price,
              item.product_id,
              item.quantity
            )
        )
      );

      return order;
    });

    return orders;
  }

  async update(entity: Order, db: Sequelize): Promise<void> {
    const transaction = await db.transaction();

    await OrderModel.update(
      {
        customer_id: entity.customerId,
        total: entity.total(),
      },
      {
        where: {
          id: entity.id,
        },
        transaction,
      }
    );

    await OrderItemModel.destroy({
      where: {
        order_id: entity.id,
      },
      transaction,
    });

    const itemsData = entity.items.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      order_id: entity.id,
      quantity: item.quantity,
      product_id: item.productId,
    }));

    await OrderItemModel.bulkCreate(itemsData, { transaction });

    await transaction.commit();
  }
}
