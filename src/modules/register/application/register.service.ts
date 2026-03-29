import { Injectable } from '@nestjs/common';
import { IRegisterResponse } from '../domain/interfaces/register.interface';
import { UsersService } from '../../users/application/users.service';
import { RegisterDto } from '../presenters/dtos/register.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class RegisterService {
    constructor(private readonly usersService: UsersService) {}


    async register(registerDto: RegisterDto) {
        // Implementation for registration logic

        const { username, email, password } = registerDto;

        // kiểm tra xem username tồn tại chưa
        const existingUser = await this.usersService.findByUsername(username);
        if (existingUser) {
            throw new Error('Username đã tồn tại');
        }
        // băm mật khẩu
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        // Ngược lại, tạo người dùng mới và lưu vào database
        const newUser = await this.usersService.createUser({
            username,
            email,
            password: hashedPassword,   
        });

        if (!newUser) {
            throw new Error('Không thể tạo người dùng');
        }

        // dùng rest để dấu mật khẩu khi trả về
        const { password: _, ...user } = newUser;
        return {    
            message: 'Đăng ký thành công',
            username: user.username,
            email: user.email,
        }
    }
    

}
