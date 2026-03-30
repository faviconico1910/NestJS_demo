import { Controller, Param, Post, UseFilters } from '@nestjs/common';
import { DogService } from '../application/dog.service';
import { CreateDogDto } from './dto/create-dog.dto';
import { Body } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';

@Controller('dog')
@UseFilters(HttpExceptionFilter)
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
