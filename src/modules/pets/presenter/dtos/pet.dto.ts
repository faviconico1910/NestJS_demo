import { 
    IsNotEmpty, 
    IsString, 
    IsNumber, 
    IsInt, 
    IsEnum, 
    IsOptional, 
    Min, 
    MaxLength 
} from 'class-validator';

import { PetStatus } from '../../domain/enums/pet_status.enum';

export class PetDto {
    @IsNotEmpty({ message: 'categoryId không được để trống' })
    @IsInt({ message: 'categoryId phải là số nguyên' })
    categoryId: number;

    @IsNotEmpty({ message: 'Tên thú cưng không được để trống' })
    @IsString() 
    @MaxLength(50, { message: 'Tên thú cưng không dài quá 50 ký tự' })
    name: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(0, { message: 'Tuổi không được là số âm' })
    age: number;

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    breed: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(0, { message: 'Giá tiền không được là số âm' })
    price: number;

    // Trạng thái không bắt buộc
    @IsOptional()
    @IsEnum(PetStatus, { message: 'Trạng thái không hợp lệ (chỉ nhận AVAILABLE, PENDING, SOLD)' })
    status?: PetStatus;

    @IsNotEmpty()
    @IsString()
    description: string;
}