import { Controller, Body, Post, HttpCode, HttpStatus, UseGuards, Get, Request} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/common/decorators/public/public.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { UserDto } from '../users/dto/user.dto';
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() userDto : UserDto) {
        return this.authService.signIn(userDto.username, userDto.password);
    }
    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        console.log(req.user);
        return req.user;
    }
}
