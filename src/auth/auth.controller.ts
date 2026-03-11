import { Controller, Body, Post, HttpCode, HttpStatus, UseGuards, Get, Request} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/common/decorators/public/public.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto : Record<string, any> ) {
        return this.authService.signIn(signInDto.username, signInDto.password);
    }
    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        console.log(req.user);
        return req.user;
    }
}
