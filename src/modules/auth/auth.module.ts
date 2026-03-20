import { Module } from '@nestjs/common';
import { AuthController } from './presenters/auth.controller';
import { AuthService } from './application/auth.service';
import { UsersModule } from '../users/users.module'
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s'}
    })
  ]
})
export class AuthModule {}
