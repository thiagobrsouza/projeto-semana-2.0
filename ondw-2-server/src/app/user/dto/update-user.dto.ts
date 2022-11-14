import { IsNotEmpty, MaxLength, IsEmail } from "class-validator";

export class UpdateUserDto {
  @IsNotEmpty({ message: 'Primeiro nome é obrigatório' })
  @MaxLength(255, { message: 'Tamanho máximo de 255 caracteres' })
  firstName: string;

  @IsNotEmpty({ message: 'Sobrenome é obrigatório' })
  @MaxLength(255, { message: 'Tamanho máximo de 255 caracteres' })
  lastName: string;
  
  @IsNotEmpty({ message: 'E-mail é obrigatório' })
  @MaxLength(255, { message: 'Tamanho máximo de 255 caracteres' })
  @IsEmail(undefined, { message: 'E-mail deve ser válido e único' })
  email: string;

}