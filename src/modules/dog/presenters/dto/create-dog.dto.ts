import { IsNumber, IsString, Min } from "class-validator";

// create-dog.dto
export class CreateDogDto {
    @IsString()
    name: string;

    @IsNumber()
    @Min(0, { message: 'Tuổi không được âm' })
    age: number;

    @IsString()
    breed: string;

    @IsNumber()
    @Min(1, { message: 'Giá phải lớn hơn hoặc bằng 1' })
    price: number;
}