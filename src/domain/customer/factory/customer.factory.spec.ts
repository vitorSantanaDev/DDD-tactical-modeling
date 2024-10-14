import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("Customer Factory unit test", () => {
  it("should create a customer", () => {
    const customer = CustomerFactory.create({ name: "Customer 1" });

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Customer 1");
    expect(customer.Address).toBeUndefined();
  });

  it("should create a customer with an address", () => {
    const address = new Address("Stree 1", 40, "5544333", "City");

    const customer = CustomerFactory.createWithAddress({
      name: "Customer 1",
      address,
    });

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Customer 1");
    expect(customer.Address).toBeDefined();
    expect(customer.Address).toBe(address);
  });
});
