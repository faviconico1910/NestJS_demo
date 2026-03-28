import { Controller, Body, Post, HttpCode, HttpStatus, UseGuards, Get, Request, Query} from '@nestjs/common';
import { AuthService } from '../application/auth.service';
import { Public } from 'src/core/decorators/public/public.decorator';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { UserDto } from '../../users/presenters/dto/user.dto';
import { JwtService } from '@nestjs/jwt';
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private jwtService: JwtService) {}

    
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() userDto : UserDto) {
        return this.authService.signIn(userDto.username, userDto.password);
    }

    // refresh endpoint
    @Post('refresh')
    async refresh(@Body() res: {userId: number, refreshToken: string} ) {
        return this.authService.refreshTokens(res.userId, res.refreshToken)
    }

    @UseGuards(AuthGuard) 
    @Post('logout')
    async logout(@Body() userId: number) {
        return this.authService.logout(userId);
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
