import Address from "../value-object/address";
import Customer from "./customer";

describe("Customer unit tests", () => {
  it("should throw when id is empty", () => {
    expect(() => {
      let customer = new Customer("", "nonh");
    }).toThrow("Id is required");
  });

  it("should throw when name is empty", () => {
    expect(() => {
      let customer = new Customer("1", "");
    }).toThrow("Name is required");
  });
  it("should change name", () => {
    const customer = new Customer("1", "nonh");
    customer.changeName("Vitor");
    expect(customer.name).toBe("Vitor");
  });
  it("should activate customer", () => {
    const customer = new Customer("1", "customer 1");
    const address = new Address("Street 1", 300, "55825000", "Chã");
    customer.Address = address;
    customer.activate();
    expect(customer.isActive()).toBe(true);
  });

  it("should deactivate customer", () => {
    const customer = new Customer("1", "customer 1");
    const address = new Address("Street 1", 300, "55825000", "Chã");
    customer.Address = address;
    customer.deactivate();
    expect(customer.isActive()).toBe(false);
  });

  it("should throw error when address is undefined when activate a customer", () => {
    expect(() => {
      const customer = new Customer("1", "customer 1");
      customer.activate();
    }).toThrow("Address is required");
  });

  it("should add reward point", () => {
    const customer = new Customer("1", "customer 1");
    expect(customer.rewardPoints).toBe(0);
    customer.addRewardPoint(10);
    expect(customer.rewardPoints).toBe(10);
    customer.addRewardPoint(10);
    expect(customer.rewardPoints).toBe(20);
  });
});
