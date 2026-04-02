import { Inject, Injectable } from '@nestjs/common';
// import { Role } from '../../common/enums/role.enum'
import { User } from '../domain/entities/user.entity';
import type { IUserRepository } from '../domain/repositories/user.repo.interface';
import { USER_REPOSITORY } from '../domain/repositories/user.repo.interface';
@Injectable()
export class UsersService {
    constructor(
        @Inject(USER_REPOSITORY)
        readonly userRepo: IUserRepository
    ) {}

    async findByUsername(username: string) {
        return await this.userRepo.findByUsername(username);
    }

    async findOneWithRelations(id: number) {
        return await this.userRepo.findOneWithRelations(id);
    }

    // tạo user mới
    async createUser(data: { username: string; email: string; password: string }): Promise<User> {
        const newUser = new User(
            0,
            data.username,
            data.password,
            data.email,
            null,
            [],
            undefined,
            undefined
        );
        return await this.userRepo.save(newUser);
    }

}
