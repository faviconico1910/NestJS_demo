import { Injectable, Inject, BadRequestException} from '@nestjs/common';
import { PET_REPOSITORY, type IPetRepository } from '../domain/repositories/pet.repo.interface';
import { PetDto } from '../presenter/dtos/pet.dto';
import type { ICategoryRepository } from 'src/modules/categories/domain/repositories/category.repo.interface';
import { CATEGORY_REPOSITORY } from 'src/modules/categories/domain/repositories/category.repo.interface';
import { Pet } from '../domain/entities/pet.entity';
import { PetStatus } from '../domain/enums/pet_status.enum';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
@Injectable()
export class PetService {
    constructor(
        @Inject(PET_REPOSITORY) 
        private  readonly petRepo: IPetRepository,

        @Inject(CATEGORY_REPOSITORY)
        private readonly categoryRepo: ICategoryRepository,

        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache
    ) {}


    async findById(id: number) {
        // định nghĩa key cho cache
        const cacheKey = `pet:detail:${id}`;

        // kiểm tra cache trước
        const cachedPet = await this.cacheManager.get(cacheKey);
        if (cachedPet) {
            console.log(`Lấy Pet ID=${id} từ Redis siêu nhanh!`);
            return cachedPet;
        }

        // nếu không có trong cache thì truy vấn database
        const pet = await this.petRepo.findById(id);

        // sau khi lấy được pet từ database, lưu vào cache với TTL 5 phút
        if (pet) {
            await this.cacheManager.set(cacheKey, pet)
            console.log("Đã truy cập database chứ k phải redis cache")
            console.log(`Lấy Pet ID=${id} từ database và lưu vào Redis!`);
            return pet;
        }
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
