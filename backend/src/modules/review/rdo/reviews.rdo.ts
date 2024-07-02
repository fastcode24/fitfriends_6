import { Expose } from 'class-transformer';
import { BasePaginationRdo } from 'src/libs/rdo';
import { ReviewRdo } from './review.rdo';

export class ReviewsRdo extends BasePaginationRdo {
  @Expose()
  public reviews: ReviewRdo[];
}
