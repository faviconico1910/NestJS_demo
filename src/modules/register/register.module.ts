import { Module } from '@nestjs/common';
import { RegisterController } from './presenters/register.controller';
import { RegisterService } from './application/register.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [RegisterController],
  providers: [RegisterService]
})
export class RegisterModule {}
