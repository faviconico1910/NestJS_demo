import {BaseEntity} from 'src/core/base-domain/base.entity';
import { PetStatus } from '../enums/pet_status.enum';
export class Pet extends BaseEntity<number> {
    categoryId: number;
    name: string;
    age: number;
    breed: string;
    price: number;
    status: PetStatus;
    description: string;

    constructor (
        id: number,
        categoryId: number,
        name: string,
        age: number,
        breed: string,
        price: number,
        status: PetStatus,
        description: string,
        createdAt?: Date,
        updatedAt?: Date
    ) {
        super(id, createdAt, updatedAt);
        this.categoryId = categoryId;
        this.name = name;
        this.age = age;
        this.breed = breed;
        this.price = price;
        this.status = status;
        this.description = description;
    }


    // hàm cập nhật nếu pet đã sold hoặc pending

    public markAsPending() {
        if (this.status !== PetStatus.AVAILABLE) {
            throw new Error("Chỉ có pet ở trạng thái AVAILABLE mới có thể chuyển sang PENDING");
        } 
        this.status = PetStatus.PENDING;
    }


    public markAsSold(){
        if (this.status === PetStatus.PENDING) {
            this.status = PetStatus.SOLD;
        }
    }
    // hàm giải phóng lock nếu pet đang ở trạng thái pending
    public releaseLock() {
        if (this.status === PetStatus.PENDING) {
            this.status = PetStatus.AVAILABLE;
        }
    }
}
