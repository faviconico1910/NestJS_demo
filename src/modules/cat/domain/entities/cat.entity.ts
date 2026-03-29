import {BaseEntity} from '../../../../core/base-domain/base.entity';

export class Cat extends BaseEntity<number> {
    name: string;
    age: number;
    breed: string;

    constructor(
        id: number, 
        name: string, 
        age: number, 
        breed: string, 
        createdAt: Date, 
        updatedAt: Date
    ) {
        // Đẩy id, createdAt, updatedAt lên cho BaseEntity xử lý
        super(id, createdAt, updatedAt);

        this.name = name;
        this.age = age;
        this.breed = breed;
    }

}