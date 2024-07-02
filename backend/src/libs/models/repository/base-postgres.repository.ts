/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaClientService } from '../prisma/prisma-client.service';

import { DefaultPojoType, Entity, EntityIdType } from './entity.interface';
import { Repository } from './repository.interface';

export abstract class BasePostgresRepository<
  EntityType extends Entity<EntityIdType, DocumentType>,
  DocumentType = DefaultPojoType,
  > implements Repository<EntityType, DocumentType> {

  constructor(
    private readonly modelName: string,
    protected readonly client: PrismaClientService,
    private readonly createEntity: (document: DocumentType) => EntityType,
  ) {}

  protected getModelName(): string {
    return this.modelName;
  }

  protected createEntityFromDocument(document: DocumentType): EntityType | null {
    if (! document) {
      return null;
    }

    return this.createEntity(document);
  }

  protected async findOne(model: string, where: object): Promise<EntityType | null> {
    const document = await this.client[model].findUnique({ where });
    return this.createEntityFromDocument(document);
  }

  public async findById(id: EntityIdType): Promise<EntityType | null> {
    const modelName = this.getModelName();

    const document = await this.client[modelName].findUnique({
      where: { id }
    });

    return this.createEntityFromDocument(document);
  }

  public async save(entity: EntityType): Promise<EntityType> {
    const modelName = this.getModelName();
    const document = await this.client[modelName].create({
      data: entity,
    });

    return this.createEntityFromDocument(document);
  }

  public async update(id: EntityIdType, entity: EntityType): Promise<EntityType> {
    const modelName = this.getModelName();
    const updatedDocument = await this.client[modelName].update({
      where: { id },
      data: entity,
    });

    return this.createEntityFromDocument(updatedDocument);
  }

  public async deleteById(id: EntityIdType): Promise<void> {
    const modelName = this.getModelName();
    await this.client[modelName].delete({
      where: { id }
    }).catch((error: PrismaClientKnownRequestError) => {
      console.error(`Error deleting ${modelName} with ID ${id}:`, error);
      throw new Error('Delete operation failed');
    });
  }
}
