import { Injectable, Logger } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewRepository } from './review.repository';
import { ReviewEntity } from './review.entity';
import { ReviewRdo, ReviewsRdo } from './rdo';
import { fillDto } from 'src/libs/helpers';
import { BaseQuery } from 'src/libs/query';
import { TrainingService } from '../training/training.service';

@Injectable()
export class ReviewService {
  private readonly logger = new Logger(ReviewService.name);

  constructor(
    private readonly reviewRepository: ReviewRepository,
    private readonly trainingService: TrainingService,
  ) {}

  private async saveRating(trainingId: string): Promise<void> {
    const rating = await this.reviewRepository.calculateRating(trainingId);
    await this.trainingService.updateRating(trainingId, rating);
  }

  public async create(userId: string, createReviewDto: CreateReviewDto): Promise<ReviewRdo> {
    const {
      trainingId,
      grade,
      text
    } = createReviewDto;

    const newReview = {
      userId,
      trainingId,
      grade,
      text
    };

    const reviewEntity = new ReviewEntity(newReview);

    const review = await this.reviewRepository.save(reviewEntity);
    await this.saveRating(trainingId);
    return fillDto(ReviewRdo, review.toPOJO());
  }

  public async find(trainingId: string, query?: BaseQuery): Promise<ReviewsRdo> {
    const reviewEntities = await this.reviewRepository.find(trainingId, query);
    return fillDto(ReviewsRdo, {
      ...reviewEntities,
      reviews: reviewEntities.entities.map((entity) =>
        fillDto(ReviewRdo, entity.toPOJO()),
      ),
    });
  }
}
