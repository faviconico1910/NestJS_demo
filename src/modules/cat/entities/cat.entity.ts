import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity('cats')
export class Cat{
    @PrimaryGeneratedColumn({name: 'cat_id'})
    id: number;

    @Column({length: 50})
    name: string;

    @Column({type: 'int'})
    age: number;

    @Column({length: 50})
    breed: string;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;
}