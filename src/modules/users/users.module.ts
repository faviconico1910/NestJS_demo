import { Module } from '@nestjs/common';
import { UsersService } from './application/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {UserEntity} from './infras/db/orm-entities/user.orm-entity'
import {RoleEntity} from './infras/db/orm-entities/role.orm-entity';
import { UserRepository } from './infras/db/repositories/user.repo.impl';
import { USER_REPOSITORY } from './domain/repositories/user.repo.interface';
import { UserMapper } from './infras/db/mappers/user.mapper';
import { RoleMapper } from './infras/db/mappers/role.mapper';
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RoleEntity])],
  providers: [UsersService, UserMapper, RoleMapper, {
    provide: USER_REPOSITORY,
    useClass: UserRepository
  }],
  exports: [UsersService, USER_REPOSITORY]
})
export class UsersModule {}
