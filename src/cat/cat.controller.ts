import { Controller, Get, Req, Post, Query, Param, Body, Redirect, HttpException, HttpStatus, UseFilters, All, ParseIntPipe, ParseEnumPipe, UsePipes, ValidationPipe} from '@nestjs/common';
import { CatsService } from '../cats/cats.service';
import {Cat} from '../interfaces/cat.interfaces';
import { CreateCatDto } from '../dto/create-cat.dto';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';
import { AllExceptionsFilter } from '../common/filters/all-exceptions.filter';
import { Gender } from '../interfaces/cat.interfaces';
import { CapitalizePipe } from '../common/pipes/upper-case.pipe';   
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { CreateCatSchema } from '../cats/create-cat.schema';
import { FilterCatDto } from 'src/dto/filter-cat.dto';



// test base exception filter
// @UseFilters(AllExceptionsFilter)
// test exception filter
// @UseFilters(HttpExceptionFilter)
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

    // Tìm kiếm theo giới tính để áp dụng pipe dạng truyền instances
    // static route phải đặt trên :V
    @Get('gender') 
    async findByGender(@Query('gender', new ParseEnumPipe(Gender)) gender: Gender) {
        return "Đây là các con mèo có giới tính là " + gender;
    }

     // tạo tính năng search để áp dụng class-validator và class-transformer
    @Get('search')
    @UsePipes(new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true }
    }))
    async searchCat(@Query() query : FilterCatDto) : Promise<string> {
        return `Con mèo có tên là ${query.name} và tuổi là ${query.age}`;
    }
    // search theo param
    // pipe dạng truyền classes
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id : string): Promise<string>{
        // exception
        return `Đây là con mèo có id là ${id}`;
    }

   

    // tạo mới mèo bằng Zod validation pipe
    @Post()
    @UsePipes(new ZodValidationPipe(CreateCatSchema))
    async createWithZod(@Body() catData: CreateCatDto) : Promise<string> {
        this.catsService.create(catData);
        return "Đã tạo con mèo có tên là " + catData.name;
    }

}

