import { Module } from '@nestjs/common';
import { PetService } from './application/pet/pet.service';
import { PetController } from './presenter/pet.controller';

@Module({
  providers: [PetService],
  controllers: [PetController]
})
export class PetsModule {}
