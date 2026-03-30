import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, CreateDateColumn, JoinTable } from "typeorm";

import {RoleEntity} from './role.orm-entity'

import { BaseOrmEntity } from "src/core/base-infras/base.orm-entity";

@Entity('users')
export class UserEntity extends BaseOrmEntity {
  @Column({ length: 50, unique: true })
  username: string;

  @Column({ length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 100, unique: true, nullable: true })
  email: string | null;

  @Column({ type: 'varchar', length: 15, nullable: true })
  phone: string | null;

  @Column({name: 'refresh_token', type:'varchar', length: 255, nullable: true})
  refreshToken: string | null;


  // Join bảng
  @ManyToMany(() => RoleEntity)
  @JoinTable({
    name: 'user_roles', // bảng trung gian
    joinColumn: { 
      name: 'user_id', 
      referencedColumnName: 'id' 
    },
    inverseJoinColumn: { 
      name: 'role_id', 
      referencedColumnName: 'id' 
    },
  })
  roles: RoleEntity[]; 
}