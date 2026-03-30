import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { Role } from '../../common/enums/role.enum'
import { UserEntity } from '../infras/db/orm-entities/user.orm-entity';
import * as bcrypt from 'bcrypt';
import type { IUserRepository } from '../domain/repositories/user.repo.interface';
import { USER_REPOSITORY } from '../domain/repositories/user.repo.interface';
import { User } from '../domain/entities/user.entity';
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
            null,
            [],
            undefined,
            undefined
        );
            return await this.userRepo.save(newUser);
    }
    // hàm lưu refresh token
    async updateRefreshToken(userId: number, hashedRefreshToken: string | null): Promise<void> 
    {
        await this.userRepo.update(userId, { refreshToken: hashedRefreshToken });
    }
}
