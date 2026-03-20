import { Injectable } from '@nestjs/common';
import {Cat} from '../domain/interfaces/cat.interfaces';
import { CatRepository } from 'src/modules/cat/infras/db/repositories/cat.repository';
import { CreateCatDto } from '../presenters/dto/create-cat.dto';
@Injectable()
export class CatsService {
    constructor(private readonly catRepo: CatRepository) {}

    // find all
    async findAll(): Promise<Cat[]> {
        return  this.catRepo.findAll();
    }

    // find id
    async findOne(id: number): Promise<Cat | null> {    
        return this.catRepo.findOne({where: {id}});
    }

    // create
    async create(catData: CreateCatDto): Promise<Cat> {
        return this.catRepo.create(catData);
    }
}
