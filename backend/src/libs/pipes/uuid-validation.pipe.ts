import { Injectable, PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { isUUID } from 'class-validator';

@Injectable()
export class UUIDValidationPipe implements PipeTransform<string> {
  transform(value: string, metadata: ArgumentMetadata): string {
    if (metadata.type !== 'param') {
      throw new Error('UUIDValidationPipe can only be used with route parameters.');
    }

    if (!isUUID(value)) {
      throw new BadRequestException(`Value ${value} is not a valid UUID.`);
    }

    return value;
  }
}
