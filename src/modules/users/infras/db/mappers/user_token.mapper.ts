import { Injectable } from '@nestjs/common';
import { BaseMapper } from '../../../../../core/base-infras/base-mapper';
import { UserToken } from 'src/modules/users/domain/entities/user_token.entity';
import { UserTokenEntity } from '../orm-entities/user_token.orm-entity'

export class TokenMapper extends BaseMapper<UserToken, UserTokenEntity> {
    toDomain(ormEntity: UserTokenEntity): UserToken {
        return new UserToken(
            ormEntity.id,
            ormEntity.user_id,
            ormEntity.refreshTokenHash,
            ormEntity.deviceInfo,
            ormEntity.isRevoked,
            ormEntity.expireAt,
            ormEntity.createdAt,    
            ormEntity.updatedAt
        );
    }

    toOrm(domainEntity: UserToken): UserTokenEntity {
        const ormEntity = new UserTokenEntity();
        if (domainEntity.id) {
            ormEntity.id = domainEntity.id;
        }
        ormEntity.user_id = domainEntity.userid;
        ormEntity.refreshTokenHash = domainEntity.refreshTokenHash;
        ormEntity.deviceInfo = domainEntity.deviceInfo;
        ormEntity.isRevoked = domainEntity.isRevoked;
        ormEntity.expireAt = domainEntity.expireAt;
        return ormEntity;
    }
}