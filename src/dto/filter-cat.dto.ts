
import {IsString, IsNumber, Min} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';


export class FilterCatDto {
    @IsString()
    @ApiProperty()
    name:string;

    @IsNumber()
    @Min(1)
    @ApiProperty()
    age:number;
}