import { Role } from '../../../../core/enums/role.enum';
export interface User {
    userId: number;
    username: string;
    password: string;
    roles: Role[];
    email: string;
}