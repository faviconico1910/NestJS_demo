import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seeder } from 'nestjs-seeder';
import {Cat} from '../orm-entities/cat.entity';

@Injectable()
export class CatSeeder implements Seeder {
    constructor (
        @InjectRepository(Cat) private readonly catRepo : Repository<Cat>
    ) {}

    async seed (): Promise<any> {
        const data = [
            { name: 'Mimi', age: 2, breed: 'British Shorthair' },
            { name: 'Hoàng Thượng', age: 5, breed: 'Mèo Mướp' },
            { name: 'Meow', age: 1, breed: 'Mèo Ba Tư' },
            { name: 'Mun', age: 3, breed: 'Mèo Mướp' },
        ]
        await this.catRepo.save(this.catRepo.create(data));

        console.log("Insert Cat Completed!!")
    }

    async drop(): Promise<any> {
        await this.catRepo.delete({});
        console.log("Drop Cat Completed!!")
    }
}