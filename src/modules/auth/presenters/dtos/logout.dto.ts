import { IsString, IsNotEmpty, IsNumber} from "class-validator";

export class LogoutDto {
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @IsString()
    @IsNotEmpty()
    refreshToken: string;
}