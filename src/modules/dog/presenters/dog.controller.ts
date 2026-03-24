import { Controller, Param, Post } from '@nestjs/common';
import { DogService } from '../application/dog.service';
import { CreateDogDto } from './dto/create-dog.dto';
import { Body } from '@nestjs/common';

@Controller('dog')
export class DogController {

    constructor(private readonly dogService: DogService) {}
    
    @Post('/create')
    async createDog(@Body() dogDto: CreateDogDto) {
        const dog = await this.dogService.createDog(dogDto);
        return dog;
    }

    @Post('/buy/:id')
    async buyDog(@Param('id') id: number) {
        const dog = await this.dogService.buyDog(id);
        return dog;
    }

}
