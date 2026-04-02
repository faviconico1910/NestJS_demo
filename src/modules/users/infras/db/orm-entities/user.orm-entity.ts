import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, CreateDateColumn, JoinTable, OneToMany } from "typeorm";

import {RoleEntity} from './role.orm-entity'

import { UserTokenEntity } from "./user_token.orm-entity";

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



  // Join bảng user_roles
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

  @OneToMany(() => UserTokenEntity, token => token.user)
  tokens: UserTokenEntity[];
}