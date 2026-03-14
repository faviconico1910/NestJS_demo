import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}
        async signIn(username: string, pass: string): Promise<{access_token: string}> {
            const user = await this.usersService.findOne(username);
            if (!user) {
                throw new UnauthorizedException('Tài khoản không tồn tại');
            }
            const isMatch = await bcrypt.compare(pass, user.password);
            if (!isMatch) {
                throw new UnauthorizedException('Mật khẩu không chính xác!');
            }
            const payload = {sub: user.userId, username: user.username, roles: user.roles};
            console.log("Login Successful!!!");
            return {
                access_token: await this.jwtService.signAsync(payload)
            };
        }
    }
