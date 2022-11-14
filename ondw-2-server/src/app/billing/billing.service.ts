import { Injectable } from '@nestjs/common';
import { triggerAsyncId } from 'async_hooks';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class BillingService {
  constructor(private readonly prismaService: PrismaService) { }

  async findAll() {
    return this.prismaService.billing.findMany({
      select: { id: true, description: true, status: true, value: true, dueDate: true, createdAt: true },
      where: { deletedAt: null }
    });
  }

  async createNew(data: CreateBillingDto, userId: string) {
    try {
      const { customerId, ...rest } = data;
      return await this.prismaService.billing.create({
        data: {
          ...rest,
          user: { connect: { id: userId } },
          customer: { connect: { id: userId } },
        }
      });
      return billing;
    } catch {
      throw new ConflictException('Empresa já cadastrada');
    }
  }

  async findOneById(id: string) {
    try {
      return await this.prismaService.billing.findFirstOrThrow({
        where: { id, deletedAt: null },
        select: { id: true, name: true, cpfCnpj: true, email: true, cellPhone: true }
      });
    } catch {
      throw new NotFoundException('Cliente não encontrado');
    }
  }

  async updateById(id: string, data: UpdateBillingDto) {
    await this.findOneById(id);
    return await this.prismaService.billing.update({
      where: { id },
      data: {...data, updatedAt: new Date()}
    });
  }

  async deleteById(id: string) {
    await this.findOneById(id);
    await this.prismaService.billing.update({
      where: { id },
      data: { deletedAt: new Date() }
    });
  }
}
