import { Module } from '@nestjs/common';
import { UsersService } from './application/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {User} from './infras/db/orm-entities/user.entity'
import {Role} from './infras/db/orm-entities/role.entity';
import { UserRepository } from './infras/db/repositories/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  providers: [UsersService, UserRepository],
  exports: [UsersService, UserRepository]
})
export class UsersModule {}
