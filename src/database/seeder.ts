import { seeder } from 'nestjs-seeder';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InitSeeder } from '../modules/users/infras/db/seeders/init.seeder';
import { CatSeeder } from '../modules/cat/infras/db/seeders/cats.seeder';
import { UserEntity } from '../modules/users/infras/db/orm-entities/user.orm-entity'
import { RoleEntity } from '../modules/users/infras/db/orm-entities/role.orm-entity'
import { CatEntity } from '../modules/cat/infras/db/orm-entities/cat.orm-entity';
import { DogEntity } from '../modules/dog/infras/db/orm-entitites/dog.orm-entity';
import { DogSeeder } from '../modules/dog/infras/db/seeders/dogs.seeder';

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
    TypeOrmModule.forFeature([RoleEntity, UserEntity, CatEntity, DogEntity]),
  ],
}).run([InitSeeder, CatSeeder, DogSeeder]);
