import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";
import { BaseOrmEntity } from "../../../../../core/base-infras/base.orm-entity";

@Entity('cats')
export class CatEntity extends BaseOrmEntity {
    @Column({length: 50})
    name: string;

    @Column({type: 'int'})
    age: number;

    @Column({length: 50})
    breed: string;

    @Column({type: 'decimal'})
    price: number;

    @Column({default: 'available'})
    status: 'available' | 'sold';

}