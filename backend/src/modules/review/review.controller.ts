import { Controller, Get, Post, Body, Param, HttpStatus, ValidationPipe, Query, Req, UseGuards } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UUIDValidationPipe } from 'src/libs/pipes';
import { ReviewRdo, ReviewsRdoExample } from './rdo';
import { BaseQuery } from 'src/libs/query';
import { RequestWithTokenPayload } from 'src/libs/requests';
import { Role } from 'src/libs/decorators';
import { UserRole } from 'src/libs/types';
import { RoleGuard } from 'src/libs/guards';

@ApiTags('Отзывы')
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @ApiOperation({
    summary: 'Получить отзывы о тренировке'
  })
  @ApiResponse({
    schema: {
      example: ReviewsRdoExample
    },
    status: HttpStatus.OK,
    description: 'Список отзывов получен',
  })
  @ApiBearerAuth('access-token')
  @Get('/:trainingId')
  public async index(
    @Param('trainingId', UUIDValidationPipe) trainingId: string,
    @Query() query: BaseQuery
  ) {
    return this.reviewService.find(trainingId, query);
  }

  @ApiOperation({
    summary: 'Добавить новый отзыв о тренировке'
  })
  @ApiResponse({
    type: ReviewRdo,
    status: HttpStatus.CREATED,
    description: 'Новый отзыв успешно добавлен.',
  })
  @Role(UserRole.Customer)
  @UseGuards(RoleGuard)
  @ApiBearerAuth('access-token')
  @Post()
  public async createReview(
    @Req() { tokenPayload }: RequestWithTokenPayload,
    @Body(new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })) dto: CreateReviewDto
  ) {
    return this.reviewService.create(tokenPayload.sub, dto);
  }
}
