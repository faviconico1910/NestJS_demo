import { Injectable } from '@nestjs/common';
import { Role } from '../../common/enums/role.enum'
import { User } from './interfaces/user.interfaces'
import * as bcrypt from 'bcrypt';

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

    // hash
    constructor() {
        this.users = this.users.map(user => ({
            ...user,
            password: bcrypt.hashSync(user.password, 10)
        }));
    }

    async findOne(username: string): Promise<User | undefined>
    {
        return this.users.find(user => user.username === username);
    }
}
