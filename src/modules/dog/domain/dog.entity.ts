export class Dog {
    id: number;
    name: string;
    age: number
    breed: string;
    price: number;
    status: 'available' | 'sold';

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

