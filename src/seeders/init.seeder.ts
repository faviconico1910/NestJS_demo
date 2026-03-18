import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seeder } from 'nestjs-seeder';
import * as bcrypt from 'bcrypt';
import { Role } from '../modules/users/entities/role.entity';
import { User } from '../modules/users/entities/user.entity';

@Injectable()
export class InitSeeder implements Seeder {
  constructor(
    @InjectRepository(Role) private readonly roleRepo: Repository<Role>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async seed(): Promise<any> {
    console.log('Seeding roles...');
    // Check existing roles
    let roleAdmin = await this.roleRepo.findOne({ where: { name: 'Admin' } });  
    let roleUser = await this.roleRepo.findOne({ where: { name: 'User' } });

    if (roleAdmin == null) {
      console.log('Admin role not found, creating...');
      roleAdmin = this.roleRepo.create({ name: 'Admin' });
      await this.roleRepo.save(roleAdmin);
    }

    if (roleUser == null) {
      console.log('User role not found, creating...');
      roleUser = this.roleRepo.create({ name: 'User' });
      await this.roleRepo.save(roleUser);
    }

    const hashAdmin = await bcrypt.hash('admin', 10);
    const hashJohn = await bcrypt.hash('changeme', 10);
    const hashMaria = await bcrypt.hash('guess', 10);

    console.log('Seeding users...');


    const userData = [
      {
        username: 'admin',
        password: hashAdmin,
        email: '23521179@gm.uit.edu.vn',
        roles: [roleAdmin]
      },
      {
        username: 'john',
        password: hashJohn,
        email: 'phannguyenkieumy123@gmail.com',
        roles: [roleUser]
      },
      {
        username: 'maria',
        password: hashMaria,
        email: 'dauducanphu1910@gmail.com',
        roles: [roleUser]
      },
      {
        username: 'alice',
        password: await bcrypt.hash('alicepass', 10),
        email: 'alice@gmail.com',
        roles: [roleUser]
      }
    ];


    for(const user of userData) {
      let existingUser = await this.userRepo.findOneBy({ username: user.username });
      if (!existingUser) {
        existingUser = this.userRepo.create({
          username: user.username,
          password: user.password,
          email: user.email,
          roles: user.roles || []
        });
        await this.userRepo.save(existingUser);
        console.log(`Created user: ${user.username}`);
      } else {
        console.log(`User ${user.username} đã tồn tại`);
      }
    }
    console.log('Completed!');
  }

  async drop(): Promise<any> {
    console.log('Dropping seeded data...');
    await this.userRepo.delete({});
    await this.roleRepo.delete({});
  }
}
