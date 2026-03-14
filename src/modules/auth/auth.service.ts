import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import * as nodemailer from 'nodemailer'
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService
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

            // tạo 1 token ngắn hạn để test đúng cái chức năng này thôi
            const emailPayload = { sub: user.userId }; 
            const confirmToken = await this.jwtService.signAsync(emailPayload, { expiresIn: '5m' });
            const confirmLink = `http://localhost:3000/auth/confirm?token=${confirmToken}`;

            // cấu hình 

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: this.configService.get<string>('EMAIL_USER'),    
                    pass: this.configService.get<string>('EMAIL_PASS'),   
                }
            });

            transporter.sendMail({
                to: user.email,        
                subject: 'Xác nhận Đăng Nhập',
                html: `<a href="${confirmLink}">Bấm vào đây để xác nhận tài khoản</a>`
            }).then(() => console.log(`Đã gửi mail thành công tới ${user.email}! `))
            .catch(err => console.log('Lỗi gửi mail:', err));

            return {
                access_token: await this.jwtService.signAsync(payload)
            };
        }
    }
