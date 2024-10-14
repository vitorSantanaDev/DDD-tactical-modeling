import Order from "./domain/checkout/entity/order";
import OrderItem from "./domain/checkout/entity/orderItem";
import Customer from "./domain/customer/entity/customer";
import Address from "./domain/customer/value-object/address";

let customer = new Customer("1", "Vitor Santana");
const address = new Address("Rua 2", 36, "1234-0000", "Recife");

customer.Address = address;
customer.activate();

const item1 = new OrderItem(Math.random().toString(), "Livro 1", 100, "p1", 10);
const item2 = new OrderItem(Math.random().toString(), "Livro 2", 200, "p2", 10);
const item3 = new OrderItem(Math.random().toString(), "Livro 3", 300, "p3", 10);

const order = new Order(Math.random().toString(), "1", [item1, item2, item3]);
