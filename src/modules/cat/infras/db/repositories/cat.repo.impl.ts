import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BaseRepository } from "../../../../../core/base-infras/base.repo.impl";
import { Cat } from "src/modules/cat/domain/entities/cat.entity";
import { ICatRepository } from "src/modules/cat/domain/repositories/cat.repository.interface";
import { CatEntity } from "../orm-entities/cat.orm-entity";
import { CatMapper } from "../mappers/cat.mapper";

@Injectable()
export class CatRepository extends BaseRepository<Cat, CatEntity> implements ICatRepository {
    constructor (
        @InjectRepository(CatEntity) 
        private readonly catRepo : Repository<CatEntity>,
        readonly mapper: CatMapper
    )
    {        
        super(catRepo, mapper);
    }

    // những hàm riêng cho mèo thì viết ở đây.
    // tìm theo tên
    async findByName(name: string): Promise<Cat | null>
    {
        const cat = await this.catRepo.findOne({
            where: {name} as any
        });
        if (!cat) {
            return null;
        }

        return this.mapper.toDomain(cat);
    }
}
