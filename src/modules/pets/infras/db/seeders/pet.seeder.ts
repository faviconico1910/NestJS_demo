import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { Repository } from 'typeorm';
import { PetEntity } from '../orm-entities/pet.orm-entity';
import { PetStatus } from 'src/modules/pets/domain/enums/pet_status.enum';

@Injectable()
export class PetSeeder  implements Seeder  {

    constructor(
        @InjectRepository(PetEntity) private readonly petRepo: Repository<PetEntity>,
    ) {}

    async seed(): Promise<any> {
        console.log('Seeding pets...');
        const petData = [
            {
                categoryId: 1, 
                name: 'Milo',
                age: 2,
                breed: 'Golden Retriever',
                price: 15000000.00, // 15 triệu
                status: PetStatus.AVAILABLE,
                description: 'Chó Golden màu vàng đồng cực đẹp, vóc dáng chuẩn, quấn chủ và cực kỳ hiền lành. Đã tiêm phòng đầy đủ 2 mũi.'
            },
            {
                categoryId: 1,
                name: 'Ngáo',
                age: 1,
                breed: 'Siberian Husky',
                price: 9500000.50,
                status: PetStatus.PENDING, // Khách đang cọc chờ bắt
                description: 'Husky mắt xanh bướng bỉnh nhưng đáng yêu, thích cãi lại chủ. Đã tẩy giun định kỳ.'
            },
            {
                categoryId: 2,
                name: 'Bánh Bao',
                age: 3,
                breed: 'British Shorthair (Mèo Anh lông ngắn)',
                price: 8000000.00,
                status: PetStatus.AVAILABLE,
                description: 'Mèo ALN form mặt nọng, tai cụp, ăn rất nhiều và lười biếng. Cần tìm sen biết massage.'
            },
            {
                categoryId: 2,
                name: 'Mực',
                age: 1,
                breed: 'Mèo Mướp Ta',
                price: 500000.00,
                status: PetStatus.SOLD, // Đã bán
                description: 'Mèo mướp bắt chuột cực đỉnh, leo trèo thoăn thoắt, sức khỏe vô địch.'
            },
            {
                categoryId: 3,
                name: 'Chíp',
                age: 1,
                breed: 'Vẹt Ngực Hồng (Cockatiel)',
                price: 1200000.00,
                status: PetStatus.AVAILABLE,
                description: 'Vẹt biết huýt sáo theo nhạc, màu sắc sặc sỡ, rất dạn người.'
            }
        ];

        for (const pet of petData) {
            const existingPet = await this.petRepo.findOne({ where: { name: pet.name } });
            if (!existingPet) {
                const petEntity = this.petRepo.create(pet);
                await this.petRepo.save(petEntity);
                console.log(`Đã tạo pet với tên ${pet.name}`);
            } else {
                console.log(`Pet ${pet.name} đã tồn tại, skipping...`);
            }
        }
        console.log('Completed!');
    }


    async drop(): Promise<any> {
        // Implement your dropping logic here
    }

}