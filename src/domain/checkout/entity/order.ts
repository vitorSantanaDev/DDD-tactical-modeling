import OrderItem from "./orderItem";

export default class Order {
  private _id: string;
  private _customerId: string;
  private _items: OrderItem[];
  private _total: number;

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
    this._total = this.total();
    this.validate();
  }

  get id() {
    return this._id;
  }

  get customerId() {
    return this._customerId;
  }

  get items() {
    return this._items;
  }

  changeItems(newItems: OrderItem[]) {
    this._items = newItems;
    this._total = this.total();
  }

  validate(): boolean {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
    if (this._customerId.length === 0) {
      throw new Error("customerId is required");
    }
    if (this._items.length === 0) {
      throw new Error("Items quantity must be greater than 0");
    }
    return true;
  }

  total(): number {
    return this._items.reduce((acc, item) => (acc += item.orderItemTotal()), 0);
  }
}
