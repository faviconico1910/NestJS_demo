import { Role } from '../../../../common/enums/role.enum';
export interface User {
    userId: number;
    username: string;
    password: string;
    roles: Role[];
    email: string;
}