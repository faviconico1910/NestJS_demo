import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seeder } from 'nestjs-seeder';
import {CatEntity} from '../orm-entities/cat.orm-entity';

@Injectable()
export class CatSeeder implements Seeder {
    constructor (
        @InjectRepository(CatEntity) private readonly catRepo : Repository<CatEntity>
    ) {}

    async seed (): Promise<any> {
        const data = [
            { name: 'Mimi', age: 2, breed: 'British Shorthair', price: 5000000 },
            { name: 'Hoàng Thượng', age: 5, breed: 'Mèo Mướp', price: 500000 },
            { name: 'Meow', age: 1, breed: 'Mèo Ba Tư', price: 8000000 },
            { name: 'Mun', age: 3, breed: 'Mèo Mướp', price: 200000 },  
        ]

        const CatInsertData: Partial<CatEntity>[] = [];
        // check if data already exists
        for (const catData of data) {
            const existingCat = await this.catRepo.findOne({ where: { name: catData.name } });
            if (!existingCat) {
                console.log(`Cat with name ${catData.name} does not exist, inserting...`);
                CatInsertData.push(catData);
            }
            else {
                console.log(`Cat with name ${catData.name} already exists, skipping...`);
            }
        }
        if (CatInsertData.length > 0) {
            await this.catRepo.save(this.catRepo.create(CatInsertData));
        } else {
            console.log("No new cats to insert.");
        }
        console.log("Insert Cat Completed!!")
    }

    async drop(): Promise<any> {
        await this.catRepo.delete({});
        console.log("Drop Cat Completed!!")
    }
}