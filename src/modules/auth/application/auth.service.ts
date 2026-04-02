import { Injectable, UnauthorizedException, BadRequestException, ForbiddenException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import * as bcrypt from 'bcrypt'
import { UsersService } from '../../users/application/users.service'
import * as crypto from 'crypto';
import { UserTokenService } from 'src/modules/users/application/user_token.service'

export interface Tokens { 
    access_token: string;
    refresh_token: string;
}
@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService,
        private userTokenService: UserTokenService
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
            if (!await bcrypt.compare(pass, user.password_hash)) {
                throw new UnauthorizedException('Mật khẩu không đúng');
            }
    
            // lấy danh sách roles
            const roles = user.roles.map(role => role.name);

            const tokens = await this.getTokens(user.id, user.username, roles);

            await this.saveNewRefreshToken(user.id, tokens.refresh_token, "");
            return tokens;
        }

        async saveNewRefreshToken(userId: number, refreshToken: string, deviceInfo: string): Promise<void> {
            const sha256Token = crypto.createHash('sha256').update(refreshToken).digest('hex');
            const ExpireAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 ngày
            deviceInfo = 'MockDevice/Windows Chrome 123.0';
            await this.userTokenService.createToken(userId, sha256Token, deviceInfo, ExpireAt);
        }

        // // hàm logout
        async logout(userId: number, refreshToken: string) {
            console.log("Đang đăng xuất...")
            const hashedToken = crypto.createHash('sha256').update(refreshToken).digest('hex');
            await this.userTokenService.revokeToken(userId, hashedToken);
        }

        // logic xử lí khi access token hết hạn, dùng refresh token để lấy access token mới
        async refreshTokens(userId: number, oldRefreshToken: string): Promise<Tokens> {

            if (await this.usersService.findOneWithRelations(userId) == null) {
                throw new BadRequestException('User không tồn tại');
            }

            const sha256Token = crypto.createHash('sha256').update(oldRefreshToken).digest('hex');
            const tokenRecord = await this.userTokenService.findByToken(userId, sha256Token);
            if (!tokenRecord || tokenRecord.isRevoked || tokenRecord.expireAt < new Date()) {
                throw new ForbiddenException('Refresh Token không hợp lệ hoặc đã hết hạn');
            }

            await this.userTokenService.revokeToken(userId, sha256Token);

            const user = await this.usersService.findOneWithRelations(userId);
            if (!user) {
                throw new BadRequestException('User không tồn tại');
            }
            // lấy danh sách roles
            const roles = user.roles.map(role => role.name);

            const newPairToken = await this.getTokens(user.id, user.username, roles);

            await this.saveNewRefreshToken(user.id, newPairToken.refresh_token, "");
            
            return newPairToken;
        }
    }
