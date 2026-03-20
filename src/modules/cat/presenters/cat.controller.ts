import { Controller, Get, Req, Post, Query, Param, Body, Header, Redirect, HttpException, HttpStatus, UseFilters, All, UseGuards} from '@nestjs/common';
import { CatsService } from '../application/cats.service';
import {Cat} from '../domain/interfaces/cat.interfaces';
import { CreateCatDto } from './dto/create-cat.dto';
import { HttpExceptionFilter } from '../../../core/filters/http-exception.filter';
import { AllExceptionsFilter } from '../../../core/filters/all-exceptions.filter';
import { Public } from 'src/core/decorators/public/public.decorator';
import { Roles } from '../../../core/decorators/roles.decorator'
import { Role } from '../../../core/enums/role.enum'
import { RolesGuard } from 'src/core/guards/roles.guard';
import { AuthGuard } from 'src/core/guards/auth.guard';

// test base exception filter
// @UseFilters(AllExceptionsFilter)
// test exception filter
@UseFilters(HttpExceptionFilter)
@Controller('cat')
export class CatController {
    //gọi service
    constructor(private readonly catsService: CatsService){}
    // tìm kiếm theo query

    @Get()
    async findAll(@Query('color') color: string): Promise<Cat[]>{
        await new Promise(resolve => setTimeout(resolve, 5000)); 
        return this.catsService.findAll();
    }


    // search theo param
    @Get(':id')
    findOne(@Param('id') id : string): string {
        // exception
        if (id > '100') {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST, 
                error: 'ID mèo không tồn tại'
            }, HttpStatus.BAD_REQUEST);
        }
        return `Đây là con mèo có id là ${id}`;
    }

    // Post, RBAC
    @Post()
    // gọi AuthGuard rồi tới RolesGuard để lấy được 
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin)
    async create(@Body() catData: CreateCatDto): Promise<any> {
        const newCat = await this.catsService.create(catData);
        return {
            message: "Đã tạo con mèo có tên là " + catData.name,
            data: newCat
        };

    }
}


