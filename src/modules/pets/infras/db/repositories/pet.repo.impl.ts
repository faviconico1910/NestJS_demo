import { Pet } from "src/modules/pets/domain/entities/pet.entity";
import { PetEntity } from "../orm-entities/pet.orm-entity";
import { Injectable } from "@nestjs/common";
import type { IPetRepository } from "src/modules/pets/domain/repositories/pet.repo.interface";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseRepository } from "src/core/base-infras/base.repo.impl";
import { TypeOrmDriver } from "src/core/base-infras/driver/typeorm.driver";
import { PetMapper } from "../mappers/pet.mapper";

@Injectable()
export class PetRepoImpl extends BaseRepository<Pet, PetEntity> implements IPetRepository {
    constructor (
        @InjectRepository(PetEntity)
        private readonly petRepo : Repository<PetEntity>,
        readonly mapper: PetMapper
        
    ) {
        super(new TypeOrmDriver(petRepo), mapper);
    }

}