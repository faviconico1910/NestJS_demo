import { Module } from '@nestjs/common';
import { UsersService } from './application/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {UserEntity} from './infras/db/orm-entities/user.orm-entity'
import {RoleEntity} from './infras/db/orm-entities/role.orm-entity';
import { UserRepository } from './infras/db/repositories/user.repo.impl';
import { USER_REPOSITORY } from './domain/repositories/user.repo.interface';
import { UserMapper } from './infras/db/mappers/user.mapper';
import { RoleMapper } from './infras/db/mappers/role.mapper';
import { TokenMapper } from './infras/db/mappers/user_token.mapper';
import { UserTokenEntity } from './infras/db/orm-entities/user_token.orm-entity';
import { UserTokenRepository } from './infras/db/repositories/user_token.repo.impl';
import { USER_TOKEN_REPOSITORY } from './domain/repositories/user_token.repo.interface';
import { UserTokenService } from './application/user_token.service';
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RoleEntity, UserTokenEntity])],
  providers: [UsersService, UserTokenService , UserMapper, RoleMapper, TokenMapper, {
    provide: USER_REPOSITORY,
    useClass: UserRepository
  }, {
    provide: USER_TOKEN_REPOSITORY,
    useClass: UserTokenRepository
  }],
  exports: [UsersService, UserTokenService, USER_REPOSITORY, USER_TOKEN_REPOSITORY]
})
export class UsersModule {}
