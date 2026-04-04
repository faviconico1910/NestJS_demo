import { Controller, UseGuards, Get, Post, Param, ParseIntPipe, Body } from '@nestjs/common';
import { PetService } from '../application/pet.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { PetDto } from './dtos/pet.dto';

@Controller('pets')
export class PetController {
    constructor(
        private readonly petService: PetService
    ) {}


    @Get('search/:petId')
    async findPet(@Param('petId', ParseIntPipe) petId: number) {
        return await this.petService.findById(petId)
    }

    @Post('create')
    async createPet(@Body() petDto: PetDto) {
        return await this.petService.createPet(petDto);
    } 
}
