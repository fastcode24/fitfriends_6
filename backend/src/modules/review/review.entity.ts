import { Entity } from 'src/libs/models';
import { Review } from 'src/libs/types';

export class ReviewEntity implements Review, Entity<string> {
  public id?: string;
  public createdAt?: Date;
  public userId: string;
  public trainingId: string;
  public grade: number;
  public text: string;

  constructor(review: Review) {
    this.populate(review);
  }

  public toPOJO() {
    return {
      id: this.id,
      createdAt: this.createdAt,
      userId: this.userId,
      trainingId: this.trainingId,
      grade: this.grade,
      text: this.text,
    };
  }

  public populate(data: Review): void {
    this.id = data.id;
    this.createdAt = data.createdAt;
    this.userId = data.userId;
    this.trainingId = data.trainingId;
    this.grade = data.grade;
    this.text = data.text;
  }

  static fromObject(data: Review): ReviewEntity {
    return new ReviewEntity(data);
  }
}
