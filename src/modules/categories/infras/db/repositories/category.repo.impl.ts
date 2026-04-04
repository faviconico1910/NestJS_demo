import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BaseRepository } from "../../../../../core/base-infras/base.repo.impl";
import { CategoryEntity } from "../orm-entities/category.orm-entity";
import { Category } from "../../../domain/entities/category.entity";
import { CategoryMapper} from "../mappers/category.mapper"
import { TypeOrmDriver } from "src/core/base-infras/driver/typeorm.driver";
import  type { ICategoryRepository } from "../../../domain/repositories/category.repo.interface";


export class CategoryRepoImpl extends BaseRepository<Category, CategoryEntity> implements ICategoryRepository {
    constructor(
        @InjectRepository(CategoryEntity)
        private readonly categoryRepo: Repository<CategoryEntity>,
        readonly mapper: CategoryMapper
    ) {
        super(new TypeOrmDriver(categoryRepo), mapper)
    }
}