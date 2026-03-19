import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BaseRepository } from "./base.repository";
import { Cat } from "../../modules/cat/entities/cat.entity";



@Injectable()
export class CatRepository extends BaseRepository<Cat> {
    constructor (
        @InjectRepository(Cat) 
        private readonly catRepo : Repository<Cat>
    )
    {        
        super(catRepo);
    }

    // những hàm riêng cho mèo thì viết ở đây.
}
