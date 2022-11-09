import { IsNotEmpty, MaxLength, IsEmail } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @MaxLength(255)
  firstName: string;

  @IsNotEmpty()
  @MaxLength(255)
  lastName: string;
  
  @IsNotEmpty()
  @MaxLength(255)
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MaxLength(255)
  password: string;
}