import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BaseRepository } from "../../../../../core/base-infras/base.repo.impl";
import { Cat } from "../orm-entities/cat.orm-entity";



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
    // tìm theo tên
    async findByName(name: string): Promise<Cat | null>
    {
        const cat = await this.catRepo.findOne({
            where: {name: name}
        });
        console.log("Đã truy cập vào database thành công");
        return cat ?? null;
    }
}
