// repository implements
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BaseRepository } from "../../../../../core/base-infras/base.repo.impl";
import { DogEntity } from "../orm-entitites/dog.orm-entity";
import type { IDogRepository } from "../../../domain/repositories/dog.repository.interface";
import { Dog } from "../../../domain/entities/dog.entity";
import { DogMapper } from "../mappers/dog.mapper";
import { TypeOrmDriver } from "src/core/base-infras/driver/typeorm.driver";
@Injectable()
export class DogRepository extends BaseRepository<Dog, DogEntity> implements IDogRepository {
    constructor (
        @InjectRepository(DogEntity) 
        private readonly dogRepo : Repository<DogEntity>,
        readonly mapper: DogMapper
    )
    {        
        super(new TypeOrmDriver(dogRepo), mapper);
    }


    async findByName(name: string): Promise<Dog | null>
    {
        const ormDog = await this.dogRepo.findOne({
            where: {name: name}
        });
        console.log("Đã truy cập vào database thành công");
        if (!ormDog) {
            return null;
        }
        return this.mapper.toDomain(ormDog);
    }
}