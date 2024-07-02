import { Entity } from "src/libs/models";
import { Balance } from "src/libs/types";

export class BalanceEntity implements Balance, Entity<string> {
  public id?: string;
  public userId: string;
  public trainingId: string;
  public count: number;

  constructor(data: Balance) {
    this.populate(data);
  }

  public toPOJO() {
    return {
      id: this.id,
      userId: this.userId,
      trainingId: this.trainingId,
      count: this.count,
    };
  }

  public populate(data: Balance): void {
    this.id = data.id;
    this.userId = data.userId;
    this.trainingId = data.trainingId;
    this.count = data.count;
  }

  static fromObject(data: Balance): BalanceEntity {
    return new BalanceEntity(data);
  }
}
