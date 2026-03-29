import { Injectable } from '@nestjs/common';
import { BaseMapper } from '../../../../../core/base-infras/base-mapper';
import { Dog } from '../../../domain/entities/dog.entity';
import { DogEntity } from '../orm-entitites/dog.orm-entity';

@Injectable() // Bắt buộc có để NestJS nó biết mà inject
export class DogMapper extends BaseMapper<Dog, DogEntity> {
    
    // Dịch từ DB ra Use Case
    toDomain(ormEntity: DogEntity): Dog {
        return new Dog(
            ormEntity.id,
            ormEntity.name,
            ormEntity.age,
            ormEntity.breed,
            ormEntity.price,
            ormEntity.status, 
            ormEntity.createdAt,
            ormEntity.updatedAt
        );
    }

    // Dịch từ Use Case nhét xuống DB
    toOrm(domainEntity: Dog): DogEntity {
        const ormEntity = new DogEntity();
        
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