import { Injectable } from '@nestjs/common';
import { ConflictException } from '@nestjs/common/exceptions';
import { genSalt, hashSync } from 'bcrypt';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return this.prismaService.user.findMany();
  }

  async createNew(data: CreateUserDto) {
    try {
      data.password = await this.hashPassword(data.password);
      return await this.prismaService.user.create({ data });
    } catch {
      throw new ConflictException('Usuário já registrado');
    }
  }

  async hashPassword(password: string) {
    const salt = await genSalt(10);
    return hashSync(password, salt);
  }
}
