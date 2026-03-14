import { Controller, Body, Post, HttpCode, HttpStatus, UseGuards, Get, Request, Query} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/common/decorators/public/public.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { UserDto } from '../users/dto/user.dto';
import { JwtService } from '@nestjs/jwt';
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private jwtService: JwtService) {}

    
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() userDto : UserDto) {
        return this.authService.signIn(userDto.username, userDto.password);
    }
    
    @Get('confirm')
    async confirmEmail(@Query('token') token: string) {
        console.log("Token nhận được từ URL là:", token);

        if (!token) {
            return "Lỗi token không tồn tại";
        }
        try {
            const payload = await this.jwtService.verifyAsync(token);
            return `XÁC NHẬN THÀNH CÔNG!`;
        } catch (error) {
            console.log(error);
        }
    }
    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        console.log(req.user);
        return req.user;
    }
}
