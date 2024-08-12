import { FullTraining } from "..";

export interface CoachOrder {
  training: FullTraining;
  quantity: number;
  cost: number;
}
