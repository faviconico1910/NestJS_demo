import { Controller, Get, Req, Post, Query, Param, Body, Header, Redirect, HttpException, HttpStatus, UseFilters, All} from '@nestjs/common';
import { CatsService } from '../cats/cats.service';
import {Cat} from '../interfaces/cat.interfaces';
import { CreateCatDto } from '../dto/create-cat.dto';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';
import { AllExceptionsFilter } from '../common/filters/all-exceptions.filter';

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

    // redirect
    // @Get('wiki')
    // @Redirect('https://en.wikipedia.org/wiki/Cat', 302)
    // redirctToWiki() {
    //     // Hàm này sẽ tự động chuyển hướng đến URL đã chỉ định
    // }

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

    // Post request, @Header decorator
    @Post()
    // @Header('Cache-Control', 'no-cache')
    // @Header('X-Custom-Message', 'Xin-chao-NestJS')
    create(@Body() catData: CreateCatDto): string {
        this.catsService.create(catData);
        return "Đã tạo con mèo có tên là " + catData.name;
    }
}

