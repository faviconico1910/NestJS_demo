import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";
import { BaseOrmEntity } from "../../../../../core/base-infras/base.orm-entity";

@Entity('cats')
export class Cat extends BaseOrmEntity {
    @Column({length: 50})
    name: string;

    @Column({type: 'int'})
    age: number;

    @Column({length: 50})
    breed: string;

}