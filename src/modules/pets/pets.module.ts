import { Module } from '@nestjs/common';
import { PetService } from './application/pet.service';
import { PetController } from './presenter/pet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetEntity } from './infras/db/orm-entities/pet.orm-entity';
import { PetMapper } from './infras/db/mappers/pet.mapper';
import { PetRepoImpl } from './infras/db/repositories/pet.repo.impl';
import { PET_REPOSITORY } from './domain/repositories/pet.repo.interface';
import { CATEGORY_REPOSITORY } from '../categories/domain/repositories/category.repo.interface';
import { CategoryRepoImpl } from '../categories/infras/db/repositories/category.repo.impl';
import { CategoryEntity } from '../categories/infras/db/orm-entities/category.orm-entity';
import { CategoryMapper } from '../categories/infras/db/mappers/category.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([PetEntity, CategoryEntity])],
  providers: [PetService, PetMapper, CategoryMapper, {
    provide: PET_REPOSITORY,
    useClass: PetRepoImpl
  }, 
  {
    provide: CATEGORY_REPOSITORY,
    useClass: CategoryRepoImpl
  }],
  controllers: [PetController],
  exports: [PetService, PET_REPOSITORY]
})

export class PetsModule {}
