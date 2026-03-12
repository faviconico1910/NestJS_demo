import { Injectable } from '@nestjs/common';
export type User = any;
import { Role } from '../common/enums/role.enum';
@Injectable()
export class UsersService {
    private readonly users = [
        {
            userId: 1,
            username: 'john',
            password: 'changeme',
            roles: [Role.User]
        },
        {
            userId: 2,
            username: 'maria',
            password: 'guess',
            roles: [Role.User]
        },
        {
            userId: 3, 
            username: 'admin',
            password: 'hard',
            roles: [Role.Admin]
        }
    ]

    async findOne(username: string): Promise<User | undefined>
    {
        return this.users.find(user => user.username === username);
    }
}
