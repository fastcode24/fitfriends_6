import { Entity } from "src/libs/models";
import { Order, OrderType, PaymentType } from "src/libs/types";

export class OrderEntity implements Order, Entity<string> {
  public id?: string;
  public createdAt?: Date;
  public userId: string;
  public coachId: string;
  public orderType: OrderType;
  public trainingId: string;
  public price: number;
  public quantity: number;
  public cost: number;
  public paymentType: PaymentType;

  constructor(data: Order) {
    this.populate(data);
  }

  public toPOJO() {
    return {
      id: this.id,
      createdAt: this.createdAt,
      userId: this.userId,
      coachId: this.coachId,
      orderType: this.orderType,
      trainingId: this.trainingId,
      price: this.price,
      quantity: this.quantity,
      cost: this.cost,
      paymentType: this.paymentType,
    };
  }

  public populate(data: Order): void {
    this.id = data.id;
    this.createdAt = data.createdAt;
    this.userId = data.userId;
    this.coachId = data.coachId;
    this.orderType = data.orderType;
    this.trainingId = data.trainingId;
    this.price = data.price;
    this.quantity = data.quantity;
    this.cost = data.cost;
    this.paymentType = data.paymentType;
  }

  static fromObject(data: Order): OrderEntity {
    return new OrderEntity(data);
  }
}
