import { Entity, Column, ManyToOne, JoinTable } from 'typeorm';

import { BaseOrmEntity } from 'src/core/base-infras/base.orm-entity';

@Entity('categories')
export class CategoryEntity extends BaseOrmEntity {
    @Column({length: 20, unique: true})
    category_name: string;
}