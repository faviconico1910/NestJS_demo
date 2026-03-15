import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { Role } from '../../common/enums/role.enum'
import { User } from './entities/user.entity'
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async findOne(username: string): Promise<User | undefined>
    {
        const user = await this.userRepository.findOne({
            where: {username: username},
            relations: ['roles']
        });
        console.log("Đã truy cập vào database thành công");
        return user ?? undefined;
    }
    
}
