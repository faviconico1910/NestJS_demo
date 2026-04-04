import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { BaseOrmEntity } from "src/core/base-infras/base.orm-entity";
import { PetStatus } from "src/modules/pets/domain/enums/pet_status.enum";
import { CategoryEntity } from "src/modules/categories/infras/db/orm-entities/category.orm-entity";

@Entity('pets')
export class PetEntity extends BaseOrmEntity {
    @Column({name: 'category_id'})
    categoryId: number;

    @Column({length: 50})
    name: string;
    @Column()
    age: number;

    @Column({length: 50})
    breed: string

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @Column({type: 'enum', enum: PetStatus, default: PetStatus.AVAILABLE})
    status: PetStatus;

    @Column({type: 'text'})
    description: string;


    // Quan hệ với CategoryEntity
    @ManyToOne(() => CategoryEntity, category => category.pets)
    @JoinColumn({ name: 'category_id' })
    category: CategoryEntity;
}