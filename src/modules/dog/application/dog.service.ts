import { Inject, Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { DOG_REPOSITORY } from '../domain/dog.repository.interface';
import type { IDogRepository } from '../domain/dog.repository.interface';
import { Dog } from '../domain/dog.entity';
import { CreateDogDto } from '../presenters/dto/create-dog.dto';


@Injectable()
export class DogService {
    constructor(
        @Inject(DOG_REPOSITORY)
        private readonly dogRepository: IDogRepository) {}

    async createDog(dogDto : CreateDogDto): Promise<Dog> {
        const newDog = Object.assign(new Dog(), {
            name: dogDto.name,
            age: dogDto.age,
            breed: dogDto.breed,
            price: dogDto.price,
            status: 'available'
        });

        // check if dog with the same name already exists
        const existingDog = await this.dogRepository.findByName(dogDto.name);
        if (existingDog) {
            throw new BadRequestException('Chó đã tồn tại');
        }
        await this.dogRepository.save(newDog);
        return newDog;  
    }

    // buy dog
    async buyDog(id: number): Promise<Dog> {
        const dog = await this.dogRepository.findById(id);
        if (!dog) {
            throw new NotFoundException('Chó không tồn tại');
        }
        dog.sold();
        await this.dogRepository.save(dog);
        return dog;
    }
}
