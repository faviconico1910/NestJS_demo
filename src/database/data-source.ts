import { DataSource } from "typeorm";
import {config} from 'dotenv'

// Import Entities
import {UserEntity} from '../modules/users/infras/db/orm-entities/user.orm-entity'
import {RoleEntity} from '../modules/users/infras/db/orm-entities/role.orm-entity'
import {CatEntity} from '../modules/cat/infras/db/orm-entities/cat.orm-entity'
import { DogEntity } from '../modules/dog/infras/db/orm-entitites/dog.orm-entity';

config()

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '123',
  database: process.env.DB_DATABASE || 'pet_shop',
  
  entities: [UserEntity, RoleEntity, CatEntity, DogEntity], 
  
  // nơi chứa migrations
  migrations: ['src/database/migrations/*.ts'], 
  
  synchronize: false, 
});