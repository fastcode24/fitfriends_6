import { Controller, Get, Post, Body, Patch, Param, HttpStatus, Query, ValidationPipe, Req, UseGuards, UsePipes } from '@nestjs/common';
import { TrainingService } from './training.service';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TrainingRdo, TrainingsRdoExample, TrainingsRdo } from './rdo';
import { TrainingQuery } from './training.query';
import { UUIDValidationPipe } from 'src/libs/pipes';
import { RequestWithTokenPayload } from 'src/libs/requests';
import { Role } from 'src/libs/decorators';
import { UserRole } from 'src/libs/types';
import { RoleGuard } from 'src/libs/guards';

@ApiTags('Тренировки')
@Controller('training')
export class TrainingController {
  constructor(private readonly trainingService: TrainingService) {}

  @ApiOperation({
    summary: 'Список всех тренировок'
  })
  @ApiResponse({
    schema: {
      example: TrainingsRdoExample
    },
    status: HttpStatus.OK,
    description: 'Список всех тренировок',
  })
  @ApiBearerAuth('access-token')
  @UsePipes(new ValidationPipe({ transform: true }))
  @Get()
  public async index(@Query() query: TrainingQuery): Promise<TrainingsRdo> {
    return this.trainingService.findAll(query);
  }

  @ApiOperation({
    summary: 'Создать новую тренировку'
  })
  @ApiResponse({
    type: TrainingRdo,
    status: HttpStatus.CREATED,
    description: 'Новая тренировка успешно создана.',
  })
  @Role(UserRole.Coach)
  @UseGuards(RoleGuard)
  @ApiBearerAuth('access-token')
  @Post()
  public async create(
    @Req() { tokenPayload }: RequestWithTokenPayload,
    @Body(new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })) dto: CreateTrainingDto
  ) {
    return this.trainingService.create(tokenPayload.sub, dto);
  }

  @ApiOperation({
    summary: 'Подробная информация о тренировке'
  })
  @ApiResponse({
    type: TrainingRdo,
    status: HttpStatus.OK,
    description: 'Тренировка найдена',
  })
  @ApiBearerAuth('access-token')
  @Get('/:id')
  public async show(@Param('id', UUIDValidationPipe) id: string) {
    return this.trainingService.findOne(id);
  }

  @ApiOperation({
    summary: 'Изменить данные тренировки'
  })
  @ApiBody({ type: UpdateTrainingDto })
  @ApiResponse({
    type: TrainingRdo,
    status: HttpStatus.OK,
    description: 'Данные тренировки успешно изменены',
  })
  @Role(UserRole.Coach)
  @UseGuards(RoleGuard)
  @ApiBearerAuth('access-token')
  @Patch('/:id')
  public async update(
    @Param('id', UUIDValidationPipe) id: string,
    @Body(new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })) dto: UpdateTrainingDto
  ) {
    return this.trainingService.update(id, dto);
  }
}
