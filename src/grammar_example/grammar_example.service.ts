import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GrammarExampleService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.grammarExample.findMany();
  }

  async findOne(id: number) {
    return this.prisma.grammarExample.findUnique({
      where: { id },
    });
  }

  async create(data: any) {
    return this.prisma.grammarExample.create({ data });
  }

  async update(id: number, data: any) {
    return this.prisma.grammarExample.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.grammarExample.delete({
      where: { id },
    });
  }
}
