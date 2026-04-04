import { Category } from 'src/modules/categories/domain/entities/category.entity';
import { BaseMapper } from '../../../../../core/base-infras/base-mapper';
import { CategoryEntity } from '../orm-entities/category.orm-entity';


export class CategoryMapper extends BaseMapper<Category, CategoryEntity> {
    toDomain(ormEntity: CategoryEntity): Category {
        return new Category(
            ormEntity.id,
            ormEntity.category_name,
            ormEntity?.createdAt,
            ormEntity?.updatedAt
        )
    }

    toOrm(domainEntity: Category):CategoryEntity {
        const ormEntity = new CategoryEntity()
        if (domainEntity.id) {
            ormEntity.id = domainEntity.id;
        }
        ormEntity.category_name = domainEntity.category_name;

        return ormEntity;
    }
}