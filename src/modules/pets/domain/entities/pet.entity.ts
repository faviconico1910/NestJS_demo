import {BaseEntity} from 'src/core/base-domain/base.entity';
import { PetStatus } from '../enums/pet_status.enum';
export class Pet extends BaseEntity<number> {
    private _categoryId: number; public get categoryId() { return this._categoryId; }
    private _name: string; public get name() { return this._name; }
    private _age: number; public get age() { return this._age; }
    private _breed: string; public get breed() { return this._breed; }
    private _price: number; public get price() { return this._price; }
    private _status: PetStatus; public get status() { return this._status }
    private _description: string; public get description() { return this._description; }

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
        this._categoryId = categoryId;
        this._name = name;
        this._age = age;
        this._breed = breed;
        this._price = price;
        this._status = status;
        this._description = description;
    }


    // hàm cập nhật nếu pet đã sold hoặc pending

    public markAsPending() {
        if (this.status !== PetStatus.AVAILABLE) {
            throw new Error("Chỉ có pet ở trạng thái AVAILABLE mới có thể chuyển sang PENDING");
        } 
        this._status = PetStatus.PENDING;
    }


    public markAsSold(){
        if (this.status === PetStatus.PENDING) {
            this._status = PetStatus.SOLD;
        }
    }
    // hàm giải phóng lock nếu pet đang ở trạng thái pending
    public releaseLock() {
        if (this.status === PetStatus.PENDING) {
            this._status = PetStatus.AVAILABLE;
        }
    }
}
