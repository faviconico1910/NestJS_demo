import { Injectable } from '@nestjs/common';
import { BaseMapper } from '../../../../../core/base-infras/base-mapper';
import { Role } from '../../../domain/entities/role.entity';
import { RoleEntity } from '../orm-entities/role.orm-entity';

export class RoleMapper extends BaseMapper<Role, RoleEntity> {
    toDomain(ormEntity: RoleEntity): Role {
        return new Role(
            ormEntity.id,
            ormEntity.name,
            ormEntity.createdAt,
            ormEntity.updatedAt
        );
    }

    toOrm(domainEntity: Role): RoleEntity {
        const ormEntity = new RoleEntity();
        if (domainEntity.id) {
            ormEntity.id = domainEntity.id;
        }
        ormEntity.name = domainEntity.name;
        return ormEntity;
    }
}