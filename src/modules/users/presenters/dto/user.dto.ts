import { IsNotEmpty, IsString, MinLength, IsArray, IsEnum } from 'class-validator';
import { Role } from '../../../../core/enums/role.enum';
export class UserDto {
    @IsNotEmpty({ message: 'Tên đăng nhập không được để trống'})
    @IsString()
    username: string;

    @IsNotEmpty({ message: 'Mật khẩu không được để trống'})
    @IsString()
    @MinLength(6)
    password: string;

    @IsArray()
    @IsEnum(Role)
    roles: Role[];
}