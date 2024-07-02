import { Injectable } from '@nestjs/common';
import { PrismaClientService } from 'src/libs/models/prisma/prisma-client.service';
import { BasePostgresRepository } from 'src/libs/models';
import { RefreshToken, Prisma } from '@prisma/client';
import { RefreshTokenEntity } from './refresh-token.entity';

@Injectable()
export class RefreshTokenRepository extends BasePostgresRepository<RefreshTokenEntity, RefreshToken> {
  constructor(
    private readonly prismaService: PrismaClientService
  ) {
    super('refreshToken', prismaService, RefreshTokenEntity.fromObject);
  }

  async createRefreshToken(data: Prisma.RefreshTokenCreateInput): Promise<RefreshToken> {
    const refreshToken = await this.prismaService.refreshToken.create({
      data,
    });
    return refreshToken;
  }

  async findByTokenId(tokenId: string): Promise<RefreshToken | null> {
    const refreshToken = await this.prismaService.refreshToken.findUnique({
      where: { tokenId },
    });
    return refreshToken;
  }

  async deleteByTokenId(tokenId: string): Promise<void> {
    await this.prismaService.refreshToken.deleteMany({
      where: { tokenId },
    });
  }

  async deleteExpiredTokens(): Promise<void> {
    await this.prismaService.refreshToken.deleteMany({
      where: {
        expiresIn: { lt: new Date() },
      },
    });
  }
}
