import { BaseEntity } from "../../../../core/base-domain/base.entity";

export class Role extends BaseEntity<number> {

    name: string;
    constructor(
        id: number, 
        name: string, 
        createdAt: Date, 
        updatedAt: Date
    ) {
        super(id, createdAt, updatedAt);
        this.name = name;
    }


}