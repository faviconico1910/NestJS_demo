import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity('dogs')
export class DogEntity {
    @PrimaryGeneratedColumn({name: 'dog_id'})
    id: number;

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