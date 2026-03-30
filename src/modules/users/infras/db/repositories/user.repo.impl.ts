import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BaseRepository } from "../../../../../core/base-infras/base.repo.impl";
import { UserEntity } from "../orm-entities/user.orm-entity";
import { User } from "../../../domain/entities/user.entity";
import { UserMapper} from "../mappers/user.mapper";
import type { IUserRepository } from "../../../domain/repositories/user.repo.interface";
import { TypeOrmDriver } from "src/core/base-infras/driver/typeorm.driver";
@Injectable()
export class UserRepository extends BaseRepository<User, UserEntity> implements IUserRepository {
    constructor (
        @InjectRepository(UserEntity)
        private readonly userRepo : Repository<UserEntity>, 
        readonly mapper: UserMapper
    )
    {
        super(new TypeOrmDriver(userRepo), mapper);
    }
    // tìm theo username
    async findByUsername(username: string): Promise<User | null>
    {
        const ormUser = await this.userRepo.findOne({
            where: {username: username},
            relations: ['roles']
        });
        console.log("Đã truy cập vào database thành công");
        return ormUser ? this.mapper.toDomain(ormUser) : null;
    }

    async findOneWithRelations(id: number): Promise<User | null> {
        const ormUser = await this.userRepo.findOne({
            where: { id },
            relations: ['roles']
        });
        console.log(ormUser);
        return ormUser ? this.mapper.toDomain(ormUser) : null;  
    }

}