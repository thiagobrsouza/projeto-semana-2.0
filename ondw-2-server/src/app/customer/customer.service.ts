import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(private readonly prismaService: PrismaService) { }

  async findAll() {
    return this.prismaService.customer.findMany({
      select: { id: true, name: true, cpfCnpj: true, email: true, cellPhone: true },
      where: { deletedAt: null }
    });
  }

  async createNew(data: CreateCustomerDto, userId: string) {
    try {
      const customer = await this.prismaService.customer.create({
        data: {
          ...data,
          user: { connect: { id: userId } },
        }
      });
      return customer;
    } catch {
      throw new ConflictException('Empresa já cadastrada');
    }
  }

  async findOneById(id: string) {
    try {
      return await this.prismaService.customer.findFirstOrThrow({
        where: { id, deletedAt: null },
        select: { id: true, name: true, cpfCnpj: true, email: true, cellPhone: true }
      });
    } catch {
      throw new NotFoundException('Cliente não encontrado');
    }
  }

  async updateById(id: string, data: UpdateCustomerDto) {
    await this.findOneById(id);
    return await this.prismaService.customer.update({
      where: { id },
      data: {...data, updatedAt: new Date()}
    });
  }

  async deleteById(id: string) {
    await this.findOneById(id);
    await this.prismaService.customer.update({
      where: { id },
      data: { deletedAt: new Date() }
    });
  }
}
