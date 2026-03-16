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

    const roleAdmin = this.roleRepo.create({ name: 'Admin' });
    const roleUser = this.roleRepo.create({ name: 'User' });
    await this.roleRepo.save([roleAdmin, roleUser]);

    const hashAdmin = await bcrypt.hash('admin', 10);
    const hashJohn = await bcrypt.hash('changeme', 10);
    const hashMaria = await bcrypt.hash('guess', 10);

    console.log('Seeding users...');

    const adminUser = this.userRepo.create({
      username: 'admin',
      password: hashAdmin,
      email: '23521179@gm.uit.edu.vn',
      roles: [roleAdmin],
    });

    const johnUser = this.userRepo.create({
      username: 'john',
      password: hashJohn,
      email: 'phannguyenkieumy123@gmail.com',
      roles: [roleUser],
    });

    const mariaUser = this.userRepo.create({
      username: 'maria',
      password: hashMaria,
      email: 'dauducanphu1910@gmail.com',
      roles: [roleUser],
    });

    // đổ dữ liệu vào database
    await this.userRepo.save([adminUser, johnUser, mariaUser]);

    console.log('Completed!');
  }

  async drop(): Promise<any> {
    console.log('Dropping seeded data...');
    await this.userRepo.delete({});
    await this.roleRepo.delete({});
  }
}
