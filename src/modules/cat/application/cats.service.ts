import { Injectable, Inject } from '@nestjs/common';
import { CreateCatDto } from '../presenters/dto/create-cat.dto';
import type { ICatRepository } from '../domain/repositories/cat.repository.interface';
import { Cat } from '../domain/entities/cat.entity';
import { CAT_REPOSITORY } from '../domain/repositories/cat.repository.interface';   
@Injectable()
export class CatsService  {
    constructor(
        @Inject('CAT_REPOSITORY')
        private readonly catRepo: ICatRepository) {}
    

    async createCat(catDto: CreateCatDto): Promise<Cat> {
        const newCat = {
            name: catDto.name,
            age: catDto.age,
            breed: catDto.breed,
        }
        if (await this.catRepo.findByName(catDto.name)) {
            throw new Error('Mèo cùng tên đã tồn tại');
        }
        return await this.catRepo.create(newCat);
    }

}
