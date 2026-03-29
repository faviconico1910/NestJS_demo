import { BaseEntity } from "../../../../core/base-domain/base.entity";
import {Role} from './role.entity'

export class User extends BaseEntity<number> {
    username: string;
    password: string;
    email: string | null;
    phone: string | null;
    refreshToken: string | null;
    roles: Role[];

    constructor (
        id: number, 
        username: string,
        password: string,
        email: string,
        phone: string | null,
        refreshToken: string | null,
        roles: Role[],
        createdAt?: Date, 
        updatedAt?: Date
    ) {
            super(id, createdAt, updatedAt);
            this.username = username;
            this.password = password;
            this.email = email;
            this.phone = phone;
            this.refreshToken = refreshToken;
            this.roles = roles;     
    }
}