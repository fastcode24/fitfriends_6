import { Logger, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { TrainingRepository } from './training.repository';
import { TrainingQuery } from './training.query';
import { fillDto } from 'src/libs/helpers';
import { TrainingRdo, TrainingsRdo } from './rdo';
import { TrainingEntity } from './training.entity';
import { SubscribeService } from '../subscribe/subscribe.service';

@Injectable()
export class TrainingService {
  private readonly logger = new Logger(TrainingService.name);

  constructor(
    private readonly trainingRepository: TrainingRepository,
    private readonly subscribeService: SubscribeService,
  ) {}

  public async getTrainingEntity(id: string): Promise<TrainingEntity> {
    const existsTraining = await this.trainingRepository.findById(id);

    if (!existsTraining) {
      this.logger.warn(`Training with id ${id} not found`);
      throw new NotFoundException(`Тренировка с id ${id} не найдена`);
    }

    return existsTraining;
  }

  public async findAll(query?: TrainingQuery): Promise<TrainingsRdo> {
    const trainingEntities = await this.trainingRepository.find(query);
    return fillDto(TrainingsRdo, {
      ...trainingEntities,
      trainings: trainingEntities.entities.map((entity) =>
        fillDto(TrainingRdo, entity.toPOJO()),
      ),
    });
  }

  public async create(coachId: string, dto: CreateTrainingDto): Promise<TrainingRdo> {
    const {
      title,
      background,
      level,
      trainingType,
      trainingTime,
      price,
      calories,
      description,
      gender,
      video,
      isFeatured
    } = dto;

    const newTraining = {
      title,
      background,
      level,
      trainingType,
      trainingTime,
      price,
      calories,
      description,
      gender,
      rating: 0,
      video,
      coachId,
      isFeatured
    };

    const newTrainingNoticeData = {
      title,
      description,
      gender,
      trainingType,
      trainingTime,
      calories,
      price,
    }

    const trainingEntity = new TrainingEntity(newTraining);

    const training = await this.trainingRepository.save(trainingEntity);
    await this.subscribeService.sendNewTrainingNotice(coachId, newTrainingNoticeData);

    return fillDto(TrainingRdo, training.toPOJO());
  }

  public async findOne(id: string) {
    const existTraining = await this.trainingRepository.findById(id);

    if (! existTraining) {
      this.logger.warn(`Training with id ${id} not found`);
      throw new NotFoundException(`Тренировка с id ${id} не найдена`);
    }

    return existTraining;
  }

  public async update(id: string, dto: UpdateTrainingDto) {
    const existsTraining = await this.getTrainingEntity(id);
    let hasChanges = false;

    for (const [key, value] of Object.entries(dto)) {
      if (value !== undefined && existsTraining[key] !== value) {
        existsTraining[key] = value;
        hasChanges = true;
      }
    }

    if (!hasChanges) {
      return fillDto(TrainingRdo, existsTraining.toPOJO());
    }

    const updatedTraining = await this.trainingRepository.update(id, existsTraining);
    return fillDto(TrainingRdo, updatedTraining.toPOJO());
  }

  public async updateRating(id: string, rating: number) {
    const existsTraining = await this.getTrainingEntity(id);

    if (existsTraining.rating === rating) {
      return;
    }

    existsTraining.rating = rating;
    await this.trainingRepository.update(id, existsTraining);
  }
}
