import { BaseEntity } from "../../../../core/base-domain/base.entity";
export class Dog extends BaseEntity<number> {
    name: string;
    age: number
    breed: string;
    price: number;
    status: 'available' | 'sold';

    constructor(
        id: number, 
        name: string, 
        age: number, 
        breed: string, 
        price: number,
        status: 'available' | 'sold' = 'available',
        createdAt: Date, 
        updatedAt: Date
    ) {
        super(id, createdAt, updatedAt);
        this.name = name;
        this.age = age;
        this.breed = breed;
        this.price = price;
        this.status = 'available';
    }
    // business logic
    sold(): void {
        // logic to mark the dog as sold
        if (this.status === 'available') {
            this.status = 'sold';
        } else {
            throw new Error('Chó đã được bán');
        }
    }
}

