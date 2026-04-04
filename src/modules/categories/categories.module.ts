import { Module } from '@nestjs/common';
import { CategoryService } from './application/category.service';
import { CategoryController } from './presenter/category.controller';
import { CategoryRepoImpl } from './infras/db/repositories/category.repo.impl';
import { CategoryMapper } from './infras/db/mappers/category.mapper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './infras/db/orm-entities/category.orm-entity';


@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  providers: [CategoryService, CategoryRepoImpl, CategoryMapper],
  controllers: [CategoryController, CategoryController],
  exports: [CategoryService, CategoryRepoImpl]
})
export class CategoriesModule {}
