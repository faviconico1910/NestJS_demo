import { seeder } from 'nestjs-seeder';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InitSeeder } from '../modules/users/infras/db/seeders/init.seeder';
import { UserEntity } from '../modules/users/infras/db/orm-entities/user.orm-entity'
import { RoleEntity } from '../modules/users/infras/db/orm-entities/role.orm-entity'
import { CategoryEntity } from '../modules/categories/infras/db/orm-entities/category.orm-entity';
import { UserTokenEntity } from 'src/modules/users/infras/db/orm-entities/user_token.orm-entity';
import { CategorySeeder } from 'src/modules/categories/infras/db/seeders/category.seeder';
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
    TypeOrmModule.forFeature([RoleEntity, UserEntity, UserTokenEntity, CategoryEntity ]),
  ],
}).run([InitSeeder, CategorySeeder]);
