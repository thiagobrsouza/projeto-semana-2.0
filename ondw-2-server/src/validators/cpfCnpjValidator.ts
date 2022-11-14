import { ValidationArguments, ValidatorConstraintInterface } from "class-validator";
import { cpf, cnpj } from 'cpf-cnpj-validator';

export class CpfCnpjValidator implements ValidatorConstraintInterface {
  validate(text: string) {
    if (text?.length <= 14) {
      return cpf.isValid(text);
    }
    return cnpj.isValid(text);
  }

  defaultMessage(args: ValidationArguments) {
    return 'CPF ou CNPJ inválido';
  }
}