import { DataSource } from "typeorm";
import {config} from 'dotenv'

// Import Entities
import {UserEntity} from '../modules/users/infras/db/orm-entities/user.orm-entity'
import {RoleEntity} from '../modules/users/infras/db/orm-entities/role.orm-entity'
import {UserTokenEntity} from '../modules/users/infras/db/orm-entities/user_token.orm-entity'
import { CategoryEntity } from '../modules/categories/infras/db/orm-entities/category.orm-entity';
import { PetEntity } from '../modules/pets/infras/db/orm-entities/pet.orm-entity';
config()

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '123',
  database: process.env.DB_DATABASE || 'pet_shop',
  
  entities: [UserEntity, RoleEntity, UserTokenEntity, CategoryEntity, PetEntity], 
  
  // nơi chứa migrations
  migrations: ['src/database/migrations/*.ts'], 
  
  synchronize: false, 
});