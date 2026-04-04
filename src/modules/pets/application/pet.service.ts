import { Injectable, Inject, BadRequestException} from '@nestjs/common';
import { PET_REPOSITORY, type IPetRepository } from '../domain/repositories/pet.repo.interface';
import { PetDto } from '../presenter/dtos/pet.dto';
import type { ICategoryRepository } from 'src/modules/categories/domain/repositories/category.repo.interface';
import { CATEGORY_REPOSITORY } from 'src/modules/categories/domain/repositories/category.repo.interface';
import { Pet } from '../domain/entities/pet.entity';
import { PetStatus } from '../domain/enums/pet_status.enum';
@Injectable()
export class PetService {
    constructor(
        @Inject(PET_REPOSITORY) 
        private  readonly petRepo: IPetRepository,

        @Inject(CATEGORY_REPOSITORY)
        private readonly categoryRepo: ICategoryRepository
    ) {}


    async findById(id: number) {
        return await this.petRepo.findById(id);
    }

    // tạo pet mới
    async createPet(dto: PetDto):Promise<Pet> {

        // Kiểm tra categoryId có tồn tại không
        const category = await this.categoryRepo.findById(dto.categoryId);
        if (!category) {
            throw new BadRequestException(`Category với id ${dto.categoryId} không tồn tại`);
        }

        // kiểm tra current status, nếu client không gửi thì mặc định là AVAILABLE
        let currentStatus = PetStatus.AVAILABLE;
        if (dto.status) {
            currentStatus = dto.status;
        }

        const newPet = new Pet(
            0,
            dto.categoryId,
            dto.name,
            dto.age,
            dto.breed,
            dto.price,
            currentStatus,
            dto.description
        )
        // save xuống database
        await this.petRepo.save(newPet);
        return newPet;
    }
}
