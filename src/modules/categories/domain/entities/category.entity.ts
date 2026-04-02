import { BaseEntity } from "../../../../core/base-domain/base.entity";


export class Category extends BaseEntity<number> {
    category_name: string

    constructor (
        id: number,
        category_name: string,
        createdAt?: Date, 
        updatedAt?: Date
    ) {
        super(id, createdAt, updatedAt);
        this.category_name = category_name;
    }
}