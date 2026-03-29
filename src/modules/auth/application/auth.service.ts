import { Injectable, UnauthorizedException, BadRequestException, ForbiddenException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import * as bcrypt from 'bcrypt'
import { UsersService } from '../../users/application/users.service'
import * as crypto from 'crypto';

export interface Tokens { 
    access_token: string;
    refresh_token: string;
}
@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService
    ) {}

        // tạo token

        async getTokens(userId: number, username: string, roles: string[]): Promise<Tokens> {
            const payload = { sub: userId, username, roles};
            const [at, rt] = await Promise.all([
                this.jwtService.signAsync(payload, {
                    secret: this.configService.get<string>('AT_SECRET'),
                    expiresIn: '60s', 
                }),
                this.jwtService.signAsync(payload, {
                    secret: this.configService.get<string>('RT_SECRET'),
                    expiresIn: '1d', 
                }),
            ])
            return { access_token: at, refresh_token: rt };

        }
        async signIn(username: string, pass: string): Promise<Tokens> {
            const user = await this.usersService.findByUsername(username);
            if (!user) {
                throw new UnauthorizedException('Tài khoản không tồn tại');
            }
            if (!await bcrypt.compare(pass, user.password)) {
                throw new UnauthorizedException('Mật khẩu không đúng');
            }
            
            // lấy danh sách roles
            const roles = user.roles.map(role => role.name);

            const tokens = await this.getTokens(user.id, user.username, roles);

            await this.updateRefreshToken(user.id, tokens.refresh_token);
            return tokens;
        }

        // hàm logout
        async logout(userId: number) {
            console.log("Đang đăng xuất...")
            return this.usersService.updateRefreshToken(userId, null);
        }

        async updateRefreshToken(userId: number, refreshToken: string | null): Promise<void> {

            if (refreshToken) {
                const sha256token = crypto.createHash('sha256').update(refreshToken).digest('hex');
                const salt = await bcrypt.genSalt();
                const hashedRefreshToken = await bcrypt.hash(sha256token, salt);
                await this.usersService.updateRefreshToken(userId, hashedRefreshToken);
            } else {
                await this.usersService.updateRefreshToken(userId, null);
            }

        }

        async refreshTokens(userId: number, refreshToken: string): Promise<Tokens> {
            const user = await this.usersService.findOneWithRelations(userId);
            if (!user) {
                throw new UnauthorizedException('Tài khoản không tồn tại');
            }
            if (user.refreshToken === null) {
                throw new ForbiddenException('Refresh Token của user không tồn tại');
            }
            const sha256Token = crypto.createHash('sha256').update(refreshToken).digest('hex');
            if (!await bcrypt.compare(sha256Token, user.refreshToken)){
                throw new ForbiddenException('Refresh Token không khớp!');
            }

            const roles = user.roles.map(role => role.name);

            const tokens = await this.getTokens(user.id, user.username, roles);

            await this.updateRefreshToken(user.id, tokens.refresh_token);

            console.log(tokens);
            return tokens;
        }
    }
