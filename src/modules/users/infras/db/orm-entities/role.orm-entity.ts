import { BaseOrmEntity } from 'src/core/base-infras/base.orm-entity';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('roles') 
export class RoleEntity extends BaseOrmEntity{
  @Column({ name: 'role_name', length: 20, unique: true })
  name: string;
}