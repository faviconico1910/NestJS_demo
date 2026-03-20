import { Controller } from '@nestjs/common';
import { RegisterService } from '../application/register.service';
import { RegisterDto } from './dtos/register.dto';
import { Body, Post, BadRequestException } from '@nestjs/common';
import { IRegisterResponse } from '../domain/interfaces/register.interface';

@Controller('register')
export class RegisterController {
    constructor(private readonly registerService: RegisterService) {}

    @Post()
    async register(@Body() registerDto: RegisterDto):Promise<IRegisterResponse> {
        try {
            return await this.registerService.register(registerDto);
        } catch (error) {
            throw new BadRequestException(error.message);
        }   
    }
}   
