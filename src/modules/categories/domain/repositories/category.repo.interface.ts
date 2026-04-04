import { IBaseRepository } from "src/core/base-application/base.repo.interface";

import { Category } from "../entities/category.entity";

export const CATEGORY_REPOSITORY = "CATEGORY_REPOSITORY";
export interface ICategoryRepository extends IBaseRepository<Category> {
    
}