import { IsNotEmpty, MaxLength, IsEmail } from "class-validator";

export class UpdateUserDto {
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

}