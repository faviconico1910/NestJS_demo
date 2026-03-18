import { DataSource } from "typeorm";
import {config} from 'dotenv'

// Import Entities
import {User} from '../modules/users/entities/user.entity'
import {Role} from '../modules/users/entities/role.entity'
import {Cat} from '../modules/cat/entities/cat.entity'

config()

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '123',
  database: process.env.DB_DATABASE || 'pet_shop',
  
  entities: [User, Role, Cat], 
  
  // nơi chứa migrations
  migrations: ['src/db/migrations/*.ts'], 
  
  synchronize: false, 
});