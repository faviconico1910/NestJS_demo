import { BaseEntity } from "../../../../core/base-domain/base.entity";
import {Role} from './role.entity'

export class User extends BaseEntity<number> {
    username: string;
    password_hash: string;
    email: string | null;
    phone: string | null;
    refreshToken: string | null;
    roles: Role[];

    constructor (
        id: number, 
        username: string,
        password_hash: string,
        email: string | null,
        phone: string | null,
        roles: Role[],
        createdAt?: Date, 
        updatedAt?: Date
    ) {
            super(id, createdAt, updatedAt);
            this.username = username;
            this.password_hash = password_hash;
            this.email = email;
            this.phone = phone;
            this.roles = roles;     
    }
}