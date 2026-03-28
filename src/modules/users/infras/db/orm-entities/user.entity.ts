import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, CreateDateColumn, JoinTable } from "typeorm";

import {Role} from './role.entity'


@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  id: number;

  @Column({ length: 50, unique: true })
  username: string;

  @Column({ length: 255 })
  password: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 15, nullable: true })
  phone: string;

  @Column({name: 'refresh_token', type:'varchar', length: 255, nullable: true})
  refreshToken: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  // Join bảng
  @ManyToMany(() => Role)
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
  roles: Role[]; 
}