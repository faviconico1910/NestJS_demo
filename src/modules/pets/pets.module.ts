import { Module } from '@nestjs/common';
import { PetService } from './application/pet.service';
import { PetController } from './presenter/pet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetEntity } from './infras/db/orm-entities/pet.orm-entity';
import { PetMapper } from './infras/db/mappers/pet.mapper';
import { PetRepoImpl } from './infras/db/repositories/pet.repo.impl';
import { PET_REPOSITORY } from './domain/repositories/pet.repo.interface';
import { CATEGORY_REPOSITORY } from '../categories/domain/repositories/category.repo.interface';

@Module({
  imports: [TypeOrmModule.forFeature([PetEntity])],
  providers: [PetService, PetMapper, {
    provide: PET_REPOSITORY,
    useClass: PetRepoImpl
  }, 
  {
    provide: CATEGORY_REPOSITORY,
    useClass: PetRepoImpl
  }],
  controllers: [PetController],
  exports: [PetService, PET_REPOSITORY]
})

export class PetsModule {}
