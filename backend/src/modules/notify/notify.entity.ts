import { Entity } from 'src/libs/models';
import { Notify } from 'src/libs/types';

export class NotifyEntity implements Notify, Entity<string> {
  public id?: string;
  public createdAt?: Date;
  public userId: string;
  public text: string;

  constructor(notify: Notify) {
    this.populate(notify);
  }

  public toPOJO() {
    return {
      id: this.id,
      createdAt: this.createdAt,
      userId: this.userId,
      text: this.text,
    };
  }

  public populate(data: Notify): void {
    this.id = data.id;
    this.createdAt = data.createdAt;
    this.userId = data.userId;
    this.text = data.text;
  }

  static fromObject(data: Notify): NotifyEntity {
    return new NotifyEntity(data);
  }
}
