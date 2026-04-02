import {Inject, Injectable} from '@nestjs/common';
import { UserToken } from '../domain/entities/user_token.entity';
import { UserTokenEntity } from '../infras/db/orm-entities/user_token.orm-entity';
import type { IUserTokenRepository } from '../domain/repositories/user_token.repo.interface';
import { USER_TOKEN_REPOSITORY } from '../domain/repositories/user_token.repo.interface';
import { readonly } from 'zod';

@Injectable()
export class UserTokenService {
    constructor(
        @Inject(USER_TOKEN_REPOSITORY)
        readonly tokenRepo: IUserTokenRepository
    ) {}

    async findByToken(userId: number, refreshToken: string): Promise<UserToken | null> {
        return await this.tokenRepo.findByToken(userId, refreshToken);
    }

    async revokeToken(userId: number, refreshToken: string): Promise<void> {
        await this.tokenRepo.revokeToken(userId, refreshToken);
    }
        // hàm này sẽ tạo token mới và lưu vào bảng user_tokens
    async createToken(userId: number, refreshTokenHash: string, deviceInfo: string, expireAt: Date): Promise<UserToken> {
        const newToken = new UserToken (
            0,
            userId,
            refreshTokenHash,
            deviceInfo,
            false,
            expireAt,
            undefined,
            undefined
        );
        return await this.tokenRepo.save(newToken);
    }
}