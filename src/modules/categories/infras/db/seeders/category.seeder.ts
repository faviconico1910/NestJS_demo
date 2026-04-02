import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seeder } from 'nestjs-seeder';
import { CategoryEntity } from '../orm-entities/category.orm-entity';

@Injectable()
export class CategorySeeder implements Seeder {
    constructor(
        @InjectRepository(CategoryEntity) private readonly categoryRepo: Repository<CategoryEntity>,
    ) {}


    async seed(): Promise<any> {
        console.log('Seeding categories...');
        const categories = ['Dog', 'Cat', 'Bird'];
        let category = new CategoryEntity();
        for (const name of categories) {
            let existing_category = await this.categoryRepo.findOne({ where: { category_name: name } });
            if (!existing_category) {
                category = this.categoryRepo.create({ category_name: name });
                await this.categoryRepo.save(category);
                console.log(`Category '${name}' created.`);
            }
        }

        console.log('Seeding Completed!')
    }

    async drop(): Promise<any> {
        console.log('Dropping categories...');
        await this.categoryRepo.query('DELETE FROM categories');
    }
}