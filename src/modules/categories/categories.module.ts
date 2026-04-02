import { Module } from '@nestjs/common';
import { CategoryService } from './application/category.service';
import { CategoryController } from './presenter/category.controller';


@Module({
  providers: [CategoryService],
  controllers: [CategoryController, CategoryController]
})
export class CategoriesModule {}
