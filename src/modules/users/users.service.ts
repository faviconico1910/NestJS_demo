import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { Role } from '../../common/enums/role.enum'
import { User } from './entities/user.entity'
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../../infrastructure/repositories/user.repository';

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
        return this.userRepo.findOne({where: {id}});
    }
    
}
