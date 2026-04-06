import { PetEntity } from "../orm-entities/pet.orm-entity";
import { Pet } from "../../../domain/entities/pet.entity";
import { BaseMapper } from "src/core/base-infras/base-mapper";

export class PetMapper extends BaseMapper<Pet, PetEntity> {
    toDomain(ormEntity: PetEntity): Pet {
        return new Pet(
            ormEntity.id,
            ormEntity.categoryId,
            ormEntity.name,
            ormEntity.age,
            ormEntity.breed,
            ormEntity.price,
            ormEntity.status,
            ormEntity.description,
            ormEntity?.createdAt,
            ormEntity?.updatedAt
        )
    }
    
    toOrm(domainEntity: Pet): PetEntity {
        const ormEntity = new PetEntity();
        if (domainEntity.id) {
            ormEntity.id = domainEntity.id;
        }
        ormEntity.categoryId = domainEntity.categoryId;
        ormEntity.name = domainEntity.name;
        ormEntity.age = domainEntity.age;
        ormEntity.breed = domainEntity.breed;
        ormEntity.price = domainEntity.price;
        ormEntity.status = domainEntity.status;
        ormEntity.description = domainEntity.description;
        return ormEntity;
    }
}