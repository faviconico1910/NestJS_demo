import { Module } from '@nestjs/common';
import { AuthController } from './presenters/auth.controller';
import { AuthService } from './application/auth.service';
import { UsersModule } from '../users/users.module'
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [UsersModule,
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('AT_SECRET'),
        signOptions: { expiresIn: '60s' },
      }),
      inject: [ConfigService],
    })
  ]
})
export class AuthModule {}
