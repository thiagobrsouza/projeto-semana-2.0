import { IsNotEmpty, MaxLength, IsEmail, Validate } from "class-validator";
import { CpfCnpjValidator } from "src/validators/cpfCnpjValidator";

export class CreateCustomerDto {
  @IsNotEmpty()
  @MaxLength(255, { message: 'Tamanho máximo de 255 caracteres' })
  name: string;

  @IsNotEmpty()
  @MaxLength(255, { message: 'Tamanho máximo de 255 caracteres' })
  @Validate(CpfCnpjValidator)
  cpfCnpj: string;

  @IsNotEmpty()
  @MaxLength(255, { message: 'Tamanho máximo de 255 caracteres' })
  @IsEmail(undefined, { message: 'E-mail deve ser válido e único' })
  email: string;

  @IsNotEmpty()
  @MaxLength(255, { message: 'Tamanho máximo de 255 caracteres' })
  cellPhone: string;
}