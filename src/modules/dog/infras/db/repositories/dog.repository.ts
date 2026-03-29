// repository implements
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BaseRepository } from "../../../../../core/base-infras/base.repo.impl";
import { DogEntity } from "../orm-entitites/dog.orm-entity";
import type { IDogRepository } from "../../../domain/dog.repository.interface";
import { Dog } from "../../../domain/dog.entity";

@Injectable()
export class DogRepository extends BaseRepository<DogEntity> implements IDogRepository {
    constructor (
        @InjectRepository(DogEntity) 
        dogRepo : Repository<DogEntity>
    )
    {        
        super(dogRepo);
    }



    async findById(id: number): Promise<Dog | null> {
        const dogEntity = await this.repository.findOne({ where: { id } });

        if (!dogEntity) {
            return null;
        }

        const dog = Object.assign(new Dog(), dogEntity);
        return dog;
    }

    async findByName(name: string): Promise<Dog | null> {
        const dogEntity = await this.repository.findOne({ where: { name } });

        if (!dogEntity) {
            return null;
        }
        const dog = Object.assign(new Dog(), dogEntity);
        return dog;
    }

    async findAll(): Promise<Dog[]> {
        const dogEntities = await this.repository.find();
        return dogEntities.map(dogEntity => Object.assign(new Dog(), dogEntity));
    }
}