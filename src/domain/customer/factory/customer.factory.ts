import Customer from "../entity/customer";
import { v4 as uuid } from "uuid";
import Address from "../value-object/address";

export default class CustomerFactory {
  public static create({ name }: { name: string }): Customer {
    return new Customer(uuid(), name);
  }
  public static createWithAddress({
    name,
    address,
  }: {
    name: string;
    address: Address;
  }): Customer {
    const customer = new Customer(uuid(), name);
    customer.changeAddress(address);
    return customer;
  }
}
