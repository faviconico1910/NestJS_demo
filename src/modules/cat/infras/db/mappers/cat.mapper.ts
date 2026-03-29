import { Injectable } from '@nestjs/common';
import { BaseMapper } from '../../../../../core/base-infras/base-mapper';
import { Cat } from '../../../domain/entities/cat.entity';
import { CatEntity } from '../orm-entities/cat.orm-entity';

export class CatMapper extends BaseMapper<Cat, CatEntity> {
    // Dịch từ DB ra Use Case
    toDomain(ormEntity: CatEntity): Cat {
        return new Cat(
            ormEntity.id,
            ormEntity.name,
            ormEntity.age,
            ormEntity.breed,
            ormEntity.price,
            ormEntity.status, 
            ormEntity.createdAt,
            ormEntity.updatedAt
        )
    }

    toOrm(domainEntity: Cat): CatEntity {
        const ormEntity = new CatEntity();

        if (domainEntity.id) {
            ormEntity.id = domainEntity.id;
        }
        
        ormEntity.name = domainEntity.name;
        ormEntity.age = domainEntity.age;
        ormEntity.breed = domainEntity.breed;
        ormEntity.price = domainEntity.price;
        ormEntity.status = domainEntity.status;
        
        return ormEntity;
    }
}