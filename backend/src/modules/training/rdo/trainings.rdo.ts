import { Expose } from 'class-transformer';
import { TrainingRdo } from '.';
import { BasePaginationRdo } from 'src/libs/rdo';

export class TrainingsRdo extends BasePaginationRdo {
  @Expose()
  public trainings: TrainingRdo[];
}
