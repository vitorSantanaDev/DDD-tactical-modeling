import EventDispatcher from "../../@shared/event/event-dispatcher";
import CustomerAddressChangedEvent from "../event/customer-address-changed.event";
import CustomerCreatedEvent from "../event/customer-created.event";
import SendLogWhenCustomerAddressIsChangedHandler from "../event/handler/send-log-customer-address-is-changed.handler";
import SendLogWhenCustomerIsCreatedHandler from "../event/handler/send-log-customer-is-created.handler";
import Address from "../value-object/address";

export default class Customer {
  private _id: string;
  private _name: string;
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate();
  }

  get name() {
    return this._name;
  }

  get id() {
    return this._id;
  }

  isActive(): boolean {
    return this._active;
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
    if (this._name.length === 0) {
      throw new Error("Name is required");
    }

    const eventHandler = new SendLogWhenCustomerIsCreatedHandler();
    const eventDispatcher = new EventDispatcher();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);

    const customerCreatedEvent = new CustomerCreatedEvent({
      id: this._id,
      name: this._name,
    });

    eventDispatcher.notify(customerCreatedEvent);
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  changeAddress(address: Address) {
    this._address = address;

    const eventHandler = new SendLogWhenCustomerAddressIsChangedHandler();
    const eventDispatcher = new EventDispatcher();

    eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);

    const customerAddressChangedEvent = new CustomerAddressChangedEvent({
      address: {
        city: address.city,
        street: address.street,
        number: address.number,
        zip: address.zip,
      },
      customer: {
        name: this.name,
        id: this.id,
      },
    });

    eventDispatcher.notify(customerAddressChangedEvent);
  }

  activate() {
    if (!this._address) {
      throw new Error("Address is required");
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  get Address() {
    return this._address;
  }

  set Address(value: Address) {
    this._address = value;
  }

  addRewardPoint(value: number) {
    this._rewardPoints += value;
  }

  get rewardPoints() {
    return this._rewardPoints;
  }
}
