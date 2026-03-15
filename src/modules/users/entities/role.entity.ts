import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('roles') 
export class Role {
  @PrimaryGeneratedColumn({ name: 'role_id' }) 
  id: number;

  @Column({ name: 'role_name', length: 20, unique: true })
  name: string;
}