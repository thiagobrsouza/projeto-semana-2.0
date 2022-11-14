import { Injectable } from '@nestjs/common';
import { ConflictException, NotFoundException } from '@nestjs/common/exceptions';
import { genSalt, hashSync } from 'bcrypt';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) { }

  async findAll() {
    return this.prismaService.user.findMany({
      select: { id: true, firstName: true, lastName: true, email: true },
      where: { deletedAt: null }
    });
  }

  async createNew(data: CreateUserDto) {
    try {
      data.password = this.hashPassword(data.password);
      const user = await this.prismaService.user.create({ data });
      delete user.password;
      return user;
    } catch {
      throw new ConflictException('Usuário já registrado');
    }
  }

  async findOneById(id: string) {
    try {
      return await this.prismaService.user.findFirstOrThrow({
        where: { id, deletedAt: null },
        select: { id: true, firstName: true, lastName: true, email: true }
      });
    } catch {
      throw new NotFoundException('Usuário não encontrado');
    }
  }

  async updateById(id: string, data: UpdateUserDto) {
    await this.findOneById(id);
    const user = await this.prismaService.user.update({
      where: { id },
      data: {...data, updatedAt: new Date()}
    });
    delete user.password;
    return user;
  }

  async deleteById(id: string) {
    await this.findOneById(id);
    await this.prismaService.user.update({
      where: { id },
      data: { deletedAt: new Date() }
    });
  }

  hashPassword(password: string) {
    return hashSync(password, 10);
  }
}
