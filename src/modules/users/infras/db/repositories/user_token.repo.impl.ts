import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BaseRepository } from "../../../../../core/base-infras/base.repo.impl";
import type { IUserTokenRepository } from "../../../domain/repositories/user_token.repo.interface";
import { TypeOrmDriver } from "src/core/base-infras/driver/typeorm.driver";
import { UserToken } from "../../../domain/entities/user_token.entity";
import { UserTokenEntity } from "../orm-entities/user_token.orm-entity";
import { TokenMapper } from "../mappers/user_token.mapper";

@Injectable()
export class UserTokenRepository extends BaseRepository<UserToken, UserTokenEntity> implements IUserTokenRepository {
    constructor (
        @InjectRepository(UserTokenEntity)
        private readonly tokenRepo : Repository<UserTokenEntity>,
        readonly mapper: TokenMapper
    )
    {
        super(new TypeOrmDriver(tokenRepo), mapper);   
    }

    async findByToken(userId: number, refreshToken: string): Promise<UserToken | null> {
        const ormToken = await this.tokenRepo.findOne({
            where: { 
                user_id : userId,
                refreshTokenHash: refreshToken
             }
        });
        return ormToken ? this.mapper.toDomain(ormToken) : null;
    }

    async revokeToken(userId: number, refreshToken: string): Promise<void> {
        await this.tokenRepo.update({ user_id: userId, refreshTokenHash: refreshToken }, { isRevoked: true });
        console.log(`Token for user ${userId} has been revoked.`);
    }
}