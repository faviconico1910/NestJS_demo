import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seeder } from 'nestjs-seeder';
import {DogEntity} from '../orm-entitites/dog.orm-entity';

@Injectable()
export class DogSeeder implements Seeder {
    constructor (
        @InjectRepository(DogEntity) private readonly dogRepo : Repository<DogEntity>
    ) {}

    async seed (): Promise<any> {
        const data: Partial<DogEntity>[] = [
            {
                name: "Buddy",
                age: 3,
                breed: "Ngao Tây Tạng",
                price: 500,
                status: 'available'
            }, 
            {
                name: "King",
                age: 2,
                breed: "Chó Cỏ",
                price: 300,
                status: 'available'
            },
            {
                name: "Max",
                age: 4,
                breed: "Bolt",
                price: 400,
                status: 'available'
            }
        ]


        const DogInsertData: Partial<DogEntity>[] = [];
        // check if data already exists
        for (const dogData of data) {
            const existingDog = await this.dogRepo.findOne({ where: { name: dogData.name } });
            if (!existingDog) {
                console.log(`Dog with name ${dogData.name} does not exist, inserting...`);
                DogInsertData.push(dogData);
            }
            else {
                console.log(`Dog with name ${dogData.name} already exists, skipping...`);
            }
        }
        if (DogInsertData.length > 0) {
            await this.dogRepo.save(this.dogRepo.create(DogInsertData));
        } else {
            console.log("No new dogs to insert.");
        }   
        console.log("Insert Dog Completed!!")
    }
    async drop(): Promise<any> {
        await this.dogRepo.query('DELETE FROM dog');
        console.log("Delete Dog Completed!!")
    }
}