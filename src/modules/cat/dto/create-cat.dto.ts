import {ApiProperty} from '@nestjs/swagger';

export class CreateCatDto {
  @ApiProperty({ example: 'Mimi', description: 'Tên của con mèo' })
  name: string;

  @ApiProperty({ example: 2, description: 'Tuổi của con mèo' })
  age: number;

  @ApiProperty({ example: 'Mèo Béo', description: 'Giống Mèo' })
  breed: string;
}