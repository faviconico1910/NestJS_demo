import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {User} from './entities/user.entity'
import {Role} from './entities/role.entity' 
import { UserRepository } from '../../infrastructure/repositories/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  providers: [UsersService, UserRepository],
  exports: [UsersService, UserRepository]
})
export class UsersModule {}
