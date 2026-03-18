import { seeder } from 'nestjs-seeder';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InitSeeder } from './seeders/init.seeder';
import { CatSeeder } from './seeders/cats.seeder';
import { Role } from './modules/users/entities/role.entity';
import { User } from './modules/users/entities/user.entity';
import { Cat } from './modules/cat/entities/cat.entity';

seeder({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: false,
      }),
    }),
    TypeOrmModule.forFeature([Role, User, Cat]),
  ],
}).run([InitSeeder, CatSeeder]);
