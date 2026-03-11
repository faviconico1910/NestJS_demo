import {ApiProperty} from '@nestjs/swagger';
import { Gender } from '../interfaces/cat.interfaces';
import { IsString, IsInt } from 'class-validator';

export class CreateCatDto {
  @ApiProperty({ example: 'Mimi', description: 'Tên của con mèo' })
  @IsString()
  name: string;

  @ApiProperty({ example: 2, description: 'Tuổi của con mèo' })
  age: number;

  @ApiProperty({ example: 'Mèo Béo', description: 'Giống Mèo' })
  breed: string;

  @ApiProperty({ example: 'male', description: 'Giới tính của con mèo' }) 
  gender: Gender;
}