import { Entity } from 'src/libs/models';
import { Level, Training, TrainingTime, Gender, TrainingType } from 'src/libs/types';

export class TrainingEntity implements Training, Entity<string> {
  public id?: string;
  public createdAt?: Date;
  public title: string;
  public background: string;
  public level: Level;
  public trainingType: TrainingType;
  public trainingTime: TrainingTime;
  public price: number;
  public calories: number;
  public description: string;
  public gender: Gender;
  public video: string;
  public rating: number;
  public coachId: string;
  public isFeatured: boolean;

  constructor(training: Training) {
    this.populate(training);
  }

  public toPOJO() {
    return {
      id: this.id,
      createdAt: this.createdAt,
      title: this.title,
      background: this.background,
      level: this.level,
      trainingType: this.trainingType,
      trainingTime: this.trainingTime,
      price: this.price,
      calories: this.calories,
      description: this.description,
      gender: this.gender,
      video: this.video,
      rating: this.rating,
      coachId: this.coachId,
      isFeatured: this.isFeatured,
    };
  }

  public populate(data: Training): void {
    this.id = data.id;
    this.createdAt = data.createdAt;
    this.title = data.title;
    this.background = data.background;
    this.level = data.level;
    this.trainingType = data.trainingType;
    this.trainingTime = data.trainingTime;
    this.price = data.price;
    this.calories = data.calories;
    this.description = data.description;
    this.gender = data.gender;
    this.video = data.video;
    this.rating = data.rating;
    this.coachId = data.coachId;
    this.isFeatured = data.isFeatured;
  }

  static fromObject(data: Training): TrainingEntity {
    return new TrainingEntity(data);
  }
}
