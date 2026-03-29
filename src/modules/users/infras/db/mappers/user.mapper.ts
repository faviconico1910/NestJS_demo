// src/modules/user/infras/db/mappers/user.mapper.ts

import { Injectable } from '@nestjs/common';
import { BaseMapper } from '../../../../../core/base-infras/base-mapper';
import { User } from '../../../domain/entities/user.entity';
import { UserEntity } from '../orm-entities/user.orm-entity';
import { RoleMapper } from'./role.mapper'; 

@Injectable()
export class UserMapper extends BaseMapper<User, UserEntity> {
    
    constructor(private readonly roleMapper: RoleMapper) {
        super();
    }

    toDomain(ormEntity: UserEntity): User {
        // Khi query DB, có thể ông KHÔNG join bảng Role (relations: ['role']). 
        // Lúc đó ormEntity.role sẽ bị undefined. Nên bắt buộc phải check kỹ!
        
        const rolesDomain = ormEntity.roles ? ormEntity.roles.map(roleOrm => this.roleMapper.toDomain(roleOrm)) 
            : [];

        // 3. Đúc ra con User Xịn (Nhét cục roleDomain vào bụng nó)
        return new User(
            ormEntity.id,
            ormEntity.username,
            ormEntity.password,
            ormEntity.email,
            ormEntity.phone,
            ormEntity.refreshToken,
            rolesDomain,
            ormEntity.createdAt,
            ormEntity.updatedAt
        );
    }

    toOrm(domainEntity: User): UserEntity {
        const ormEntity = new UserEntity();
        if (domainEntity.id) {
            ormEntity.id = domainEntity.id;
        }
        ormEntity.username = domainEntity.username;
        ormEntity.password = domainEntity.password;

        // Lưu db
        if (domainEntity.roles && domainEntity.roles.length > 0) {
                    ormEntity.roles = domainEntity.roles.map(roleDomain => this.roleMapper.toOrm(roleDomain)); 
                }

        return ormEntity;
    }
}