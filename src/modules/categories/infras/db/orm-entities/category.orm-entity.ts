import { Entity, Column, ManyToOne, JoinTable, OneToMany } from 'typeorm';

import { BaseOrmEntity } from 'src/core/base-infras/base.orm-entity';
import { PetEntity } from 'src/modules/pets/infras/db/orm-entities/pet.orm-entity';

@Entity('categories')
export class CategoryEntity extends BaseOrmEntity {
    @Column({length: 20, unique: true})
    category_name!: string;

    @OneToMany(() => PetEntity, pet => pet.category)
    pets!: PetEntity[]; 
}