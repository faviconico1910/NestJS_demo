import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from '../../users/application/users.service'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import * as nodemailer from 'nodemailer'
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}
        async signIn(username: string, pass: string): Promise<{access_token: string}> {
            const user = await this.usersService.findByUsername(username);
            if (!user) {
                throw new UnauthorizedException('Tài khoản không tồn tại');
            }
            if (!await bcrypt.compare(pass, user.password)) {
                throw new UnauthorizedException('Mật khẩu không đúng');
            }
            const payload = {sub: user.id, username: user.username, 
                roles: user.roles.map(role => role.name)};
            return {
                access_token: await this.jwtService.signAsync(payload)
            };
        }
    }
