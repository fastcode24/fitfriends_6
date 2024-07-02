import { TrainingType } from "..";

export interface Notice {
  coachName: string;
  title: string;
  description: string;
  type: TrainingType;
  calories: number;
}
