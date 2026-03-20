import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BaseRepository } from "../../../../../core/base/base.repository";
import { User } from "../orm-entities/user.entity";

@Injectable()
export class UserRepository extends BaseRepository<User> {
    constructor (
        @InjectRepository(User)
        private readonly userRepo : Repository<User>
    )
    {
        super(userRepo);
    }
    // tìm theo username
    async findByUsername(username: string): Promise<User | undefined>
    {
        const user = await this.userRepo.findOne({
            where: {username: username},
            relations: ['roles']
        });
        console.log("Đã truy cập vào database thành công");
        return user ?? undefined;
    }
}