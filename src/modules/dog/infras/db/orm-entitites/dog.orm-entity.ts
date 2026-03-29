import { BaseOrmEntity } from 'src/core/base-infras/base.orm-entity';
import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity('dogs')
export class DogEntity extends BaseOrmEntity {
    @Column()
    name: string;

    @Column()
    age: number;

    @Column()
    breed: string;

    @Column('decimal')
    price: number;

    @Column({default: 'available'})
    status: 'available' | 'sold';
}