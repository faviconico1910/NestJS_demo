import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
// import { Role } from '../../common/enums/role.enum'
import { User } from '../infras/db/orm-entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../infras/db/repositories/user.repository';

@Injectable()
export class UsersService {
    constructor(
        private readonly userRepo: UserRepository
    ) {}

    // gọi hàm findByUsername
    async findByUsername(username:string):Promise <User | undefined>{
        return this.userRepo.findByUsername(username);
    }
    
    // find id
    async findOne(id: number): Promise<User | null> {
        const data = await this.userRepo.findOne({
            id
        });
        console.log(data)
        return data;
    }
    
    async findOneWithRelations(id: number): Promise<User | null> {
        return this.userRepo.findOneWithRelations(id);
    }
    // hàm create để dùng trong modules register
    async create(user: Partial<User>): Promise<User | null> {
        return this.userRepo.create(user);
    }

    // hàm lưu refresh token
    async updateRefreshToken(userId: number, hashedRefreshToken: string | null): Promise<void> 
    {
        await this.userRepo.update(userId, { refreshToken: hashedRefreshToken });
    }
}
