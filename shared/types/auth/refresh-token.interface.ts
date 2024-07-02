import { TokenPayload } from '..';

export interface RefreshToken {
  id?: string;
  tokenId: string;
  createdAt: Date;
  userId: string;
  expiresIn: Date;
}

export interface RefreshTokenPayload extends TokenPayload {
  tokenId: string;
}
